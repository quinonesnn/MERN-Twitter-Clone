import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const useFollow = () => {
    const queryClient = useQueryClient();

    const { mutate:follow, isPending } = useMutation({
        mutationFn: async (userId) => {
            try{
                const res = await fetch(`/api/user/follow/${userId}`, {
                    method: "POST",
                })
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to follow user");
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            Promise.all(
                // refetch suggested users now that you followed them
                queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
                // refetch authUser.followers to update the followers count
                queryClient.invalidateQueries({ queryKey: ["authUser"] })
            )
        },
        onError: () => {
            toast.error(error.message);
        },
    });

    return { follow, isPending };

}

export default useFollow;