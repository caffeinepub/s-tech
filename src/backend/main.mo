import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserId = Principal;

  type CompanyProfile = {
    email : Text;
    firstName : Text;
    lastName : Text;
    dateOfBirth : Int;
    companyWebsite : Text;
    companyAddress : Text;
    servicesNeeded : [ServiceType];
    createdAt : Int;
    updatedAt : Int;
  };

  type ServiceType = {
    #aiSupportAgents;
    #automationBots;
    #processOptimization;
    #customSolutions;
  };

  module CompanyProfile {
    public func compare(profile1 : CompanyProfile, profile2 : CompanyProfile) : Order.Order {
      if (profile1.createdAt < profile2.createdAt) { #less } else if (profile1.createdAt > profile2.createdAt) { #greater } else {
        #equal;
      };
    };
  };

  type TeamMember = {
    name : Text;
    designation : Text;
  };

  module TeamMember {
    public func compare(member1 : TeamMember, member2 : TeamMember) : Order.Order {
      Text.compare(member1.name, member2.name); // Compare by name
    };
  };

  let companyProfiles = Map.empty<UserId, CompanyProfile>();
  let teamMembers = Map.empty<UserId, List.List<TeamMember>>();

  public shared ({ caller }) func createOrUpdateCompanyProfile(
    email : Text,
    firstName : Text,
    lastName : Text,
    dateOfBirth : Int,
    companyWebsite : Text,
    companyAddress : Text,
    servicesNeeded : [ServiceType],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("You do not have permission to create or update a company profile");
    };
    let timestamp = Time.now();
    let existingProfile = companyProfiles.get(caller);
    let newProfile : CompanyProfile = {
      email;
      firstName;
      lastName;
      dateOfBirth;
      companyWebsite;
      companyAddress;
      servicesNeeded;
      createdAt = switch (existingProfile) {
        case (null) { timestamp };
        case (?profile) { profile.createdAt };
      };
      updatedAt = timestamp;
    };
    companyProfiles.add(caller, newProfile);
  };

  public query ({ caller }) func getCompanyProfile() : async CompanyProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("You do not have permission to view this company profile");
    };
    switch (companyProfiles.get(caller)) {
      case (null) { Runtime.trap("Company profile not found") };
      case (?profile) { profile };
    };
  };

  public shared ({ caller }) func deleteCompanyProfile() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("You do not have permission to delete this company profile");
    };
    if (not companyProfiles.containsKey(caller)) {
      Runtime.trap("Company profile not found");
    };
    companyProfiles.remove(caller);
    teamMembers.remove(caller);
  };

  public shared ({ caller }) func addOrUpdateTeamMember(name : Text, designation : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("You do not have permission to add or update team members");
    };
    if (not companyProfiles.containsKey(caller)) {
      Runtime.trap("Company profile not found. Create a company profile first");
    };
    let newMember : TeamMember = {
      name;
      designation;
    };
    let existingMembers = switch (teamMembers.get(caller)) {
      case (null) { List.empty<TeamMember>() };
      case (?members) { members };
    };
    let membersArray = existingMembers.toArray();
    let filteredList = membersArray.filter(
      func(member) {
        if (member.name == name) {
          Runtime.trap("Team member already exists. Update only designation if needed");
        };
        true;
      }
    );
    let updatedMembers = List.fromArray<TeamMember>(filteredList.concat([newMember]));
    teamMembers.add(caller, updatedMembers);
  };

  public query ({ caller }) func getTeamMembers() : async [TeamMember] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("You do not have permission to view team members");
    };
    let members = switch (teamMembers.get(caller)) {
      case (null) { List.empty<TeamMember>() };
      case (?members) { members };
    };
    members.toArray().sort();
  };

  public shared ({ caller }) func deleteTeamMember(name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("You do not have permission to delete team members");
    };
    let existingMembers = switch (teamMembers.get(caller)) {
      case (null) { Runtime.trap("No team members found") };
      case (?members) { members };
    };
    let filteredMembers = existingMembers.filter(
      func(member) {
        member.name != name
      }
    );
    teamMembers.add(caller, filteredMembers);
  };

  public query ({ caller }) func getCompanyProfileById(userId : UserId) : async CompanyProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("You do not have permission to view this company profile");
    };
    switch (companyProfiles.get(userId)) {
      case (null) { Runtime.trap("Company profile not found") };
      case (?profile) { profile };
    };
  };

  public query ({ caller }) func getTeamMembersById(userId : UserId) : async [TeamMember] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("You do not have permission to view team members");
    };
    let members = switch (teamMembers.get(userId)) {
      case (null) { List.empty<TeamMember>() };
      case (?members) { members };
    };
    members.toArray().sort();
  };
};
