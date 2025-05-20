import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../app/auth/_graphql/queries";
type CurrentUser = {
  _id: string;
  clientPortalId: string;
  firstName: string;
  fullName: string;
  lastName: string;
  username: string;
  avatar: string;
  erxesCustomerId: string;
  email: string;
  phone: string;
};
const useCurrentUser = () => {
  const {
    data,
    // error
  } = useQuery<{ clientPortalCurrentUser: CurrentUser }>(CURRENT_USER);
  const currentUser = data?.clientPortalCurrentUser;

  return {
    currentUser,
  };
};

export default useCurrentUser;
