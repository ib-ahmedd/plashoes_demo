import AccountInfoBox from "./components/AccountInfoBox";
import { useContext } from "react";
import { AppContext } from "../../../../App";

const AccountOverview = () => {
  const { user } = useContext(AppContext);

  const { fname, lname, email, address, phone, code } = user;
  return (
    <section className="acc-overview">
      <div className="acc-info-cont">
        <AccountInfoBox
          title={"ACCOUNT DETAILS"}
          info={
            <>
              <h3>
                {fname} {lname}
              </h3>{" "}
              <p>{email}</p>
            </>
          }
        />
        <AccountInfoBox
          title={"ADDRESS BOOK"}
          info={
            <>
              <h3>Your default shipping address:</h3>
              <p>
                {fname} {lname}
              </p>
              <p>{address}</p>
              <p>{phone && code + phone.toString()}</p>
            </>
          }
        />
      </div>
    </section>
  );
};
export default AccountOverview;
