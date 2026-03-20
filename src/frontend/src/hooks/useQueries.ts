import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceType } from "../backend";
import type { CompanyProfile, TeamMember } from "../backend";
import { useActor } from "./useActor";

export type { CompanyProfile, TeamMember };
export { ServiceType };

export function useGetCompanyProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<CompanyProfile | null>({
    queryKey: ["companyProfile"],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCompanyProfile();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateOrUpdateCompanyProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      email: string;
      firstName: string;
      lastName: string;
      dateOfBirth: bigint;
      companyWebsite: string;
      companyAddress: string;
      servicesNeeded: ServiceType[];
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.createOrUpdateCompanyProfile(
        data.email,
        data.firstName,
        data.lastName,
        data.dateOfBirth,
        data.companyWebsite,
        data.companyAddress,
        data.servicesNeeded,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyProfile"] });
    },
  });
}

export function useGetTeamMembers() {
  const { actor, isFetching } = useActor();
  return useQuery<TeamMember[]>({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamMembers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddOrUpdateTeamMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; designation: string }) => {
      if (!actor) throw new Error("Not connected");
      await actor.addOrUpdateTeamMember(data.name, data.designation);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
}

export function useDeleteTeamMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteTeamMember(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
  });
}
