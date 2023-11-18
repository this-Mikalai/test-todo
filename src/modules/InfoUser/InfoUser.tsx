import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { handleShowModal } from "../../store/slices/UserReducer";
import { IAddress, ICompany } from "../../types/userTypes";
import "./InfoUser.scss";

const InfoUser = () => {
  const { users, activeUserId } = useAppSelector((state) => state.user);
  const user = users.find((user) => user.id === activeUserId);
  const dispatch = useAppDispatch();
  if (!user) {
    return <div></div>;
  }
  const generateAddressData = (address: IAddress): JSX.Element => {
    const {
      street,
      suite,
      city,
      zipcode,
      geo: { lat, lng },
    } = address;
    return (
      <div>
        <h3>Address</h3>
        <div>Street: {street}</div>
        <div>Suite: {suite}</div>
        <div>City: {city}</div>
        <div>Zipcode: {zipcode}</div>
        <div>
          Geo: {lat}, {lng}
        </div>
      </div>
    );
  };
  const generateCompanyData = (company: ICompany): JSX.Element => {
    const { name, catchPhrase, bs } = company;
    return (
      <div>
        <h3>Company</h3>
        <div>name: {name}</div>
        <div>catchPhrase: {catchPhrase}</div>
        <div>bs: {bs}</div>
      </div>
    );
  };
  return (
    <div className="block-info">
      <span onClick={() => dispatch(handleShowModal(false))}> &times;</span>
      <div>
        <div>{generateAddressData(user?.address)}</div>
        <div>{generateCompanyData(user?.company)}</div>
      </div>
    </div>
  );
};

export default InfoUser;
