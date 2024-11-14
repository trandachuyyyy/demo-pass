import apiWallet from "@/services/wallet/wallet.services";
import { useWalletStateBe } from "@/store/walletStore";
import { useMutation } from "@tanstack/react-query";

export const useWalletParseAddressBe = () => {
    const { setDataAddress } = useWalletStateBe();

    const mutationParseAddress = useMutation({
        mutationFn: (data: any) => {
            return apiWallet.parseAddress(data);
        },
    });

    const onParseAddress = (address: string) => {
        mutationParseAddress.mutate(
            { address },
            {
                onSuccess: ({ data, ...res }) => {
                    setDataAddress(data);
                },
                onError: (err) => {
                    console.log("err parse address", err);
                },
            }
        );
    };

    return { onParseAddress, isLoading: mutationParseAddress.isPending };
};