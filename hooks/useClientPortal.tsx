import { EDIT_CP_MUTATION } from "@/graphql/mutations";
import { CP_GET_CONFIG } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";

const useClientPortal = ({ id }: { id: string }) => {
  console.log(id);
  const { data, loading } = useQuery(CP_GET_CONFIG, {
    variables: { _id: id },
  });

  const [updateCp] = useMutation(EDIT_CP_MUTATION, {
    refetchQueries: [
      {
        query: CP_GET_CONFIG,
        variables: { _id: id },
      },
    ],
  });
  const cpDetail = data?.clientPortalGetConfig || {};

  const update = (config: any) => {
    updateCp({
      variables: {
        config: {
          name: config.name || cpDetail.name,
          kind: "client",
          _id: id,
          template: config.template || cpDetail.template,
          templateId: config.templateId || cpDetail.templateId,
          messengerBrandCode: config.messengerBrandCode || cpDetail.messengerBrandCode,
        },
      },
    });
  };

  return { cpDetail, loading, id, update };
};

export default useClientPortal;
