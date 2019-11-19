/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Adapter from "enzyme-adapter-react-16/build";
import { BrowserRouter as Router } from "react-router-dom";
import UserRequests, {
  UserRequests as UserRequestsComponent,
} from "../../../components/user-requests/UserRequests";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";

Enzyme.configure({ adapter: new Adapter() });
const store = configureStore([thunk])({
  profile: {
    user: {},
  },
});
const props = {
  user: {
    firstname: "Rugumbira",
    image_url: "https://res.cloudinary.com/dodfpnbik/image/upload/v1574070442/Screen_Shot_2019-11-18_at_11.44.38_bdjv7r.png"
  },
  postsPerPage: 4,
  currentPage: 1,
  errors: {},
  getUserRequests: jest.fn(),
  retrieveProfile: jest.fn(),
  requests: {
    requestFound: true,
    requests: [
      {
        id: 8,
        user_id: 9,
        request_type: "OneWay",
        location_id: 3,
        departure_date: "2019-11-16",
        return_date: null,
        destinations: [
          {
            room_id: 2,
            check_in: "2019-11-18T15:16:38.447Z",
            check_out: "2019-12-27T15:16:38.447Z",
            destination_id: 4,
            accomodation_id: 1,
          },
        ],
        reason: "Visit Lagos",
        status: "Pending",
        createdAt: "2019-11-11T06:53:54.602Z",
        updatedAt: "2019-11-11T06:53:54.602Z",
      },
    ],
  },
};
describe("User Requests View", () => {
  const component = mount(
    <Router>
      <UserRequestsComponent {...props} history={{ push: jest.fn() }} />
    </Router>,
  );
  const component2 = shallow(
    <UserRequestsComponent {...props} history={{ push: jest.fn() }} />,
  );
  it("should render User Request View without crashing", () => {
    expect(component).toHaveLength(1);
  });
  it(" should trigger componentWillReceiveProps in User Requests view", () => {
    const nextPropsSuccess = { ...props };
    component.setProps(nextPropsSuccess);
    expect(component).toHaveLength(1);
  });
  it("should trigger componentWillReceiveProps errors case in User Requests view", () => {
    const nextPropsError = {
      errors: {
        error: "This User has no request",
      },
    };
    component2.setProps(nextPropsError);
    expect(component2).toHaveLength(1);
  });
  it("should trigger componentWillReceiveProps when errors are empty case in User Requests view", () => {
    const nextPropsError = {
      errors: {},
    };
    component2.setProps(nextPropsError);
    expect(component2).toHaveLength(1);
  });
});
