/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Adapter from "enzyme-adapter-react-16/build";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import HostReset, {
  HostReset as HostResetComponent,
} from "../../../components/host/HostReset";
import successresponse from "../../../__mocks__/__get_user_request_success__.json";

const validateHost = jest.fn();

Enzyme.configure({ adapter: new Adapter() });
const mockedStore = configureStore([thunk]);
const resetHostPassword = jest.fn();
const props = {
  notifications: {
    notifications: [
      {
        createdAt: "2019-11-13T10:07:21.401Z",
        id: 8,
        message: "visit nairobi",
        request_id: 12,
        seen: "false",
        type: "ReturnTrip",
        updatedAt: "2019-11-15T13:13:44.347Z",
        user_id: 49,
        notPaneDisplay: false,
      },
    ],
    markThisRead: jest.fn(),
    toggleNotDisplay: jest.fn(),
    notPaneDisplay: false,
    notificationCount: 1,
  },
  loginState: {
    isAuthenticated: true,
  },
  profile: {
    user: {
      firstname: "Rugumbira",
      image_url:
      "https://res.cloudinary.com/dodfpnbik/image/upload/v1574070442/Screen_Shot_2019-11-18_at_11.44.38_bdjv7r.png",
      role_value: 7,
    },
  },
  user: {
    firstname: "Rugumbira",
    image_url:
    "https://res.cloudinary.com/dodfpnbik/image/upload/v1574070442/Screen_Shot_2019-11-18_at_11.44.38_bdjv7r.png",
    role_value: 7,
  },
  postsPerPage: 4,
  currentPage: 1,
  errors: {},
  resetHostPassword,
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
        User: {
          image_url: "image",
          email: "usertest@gmail.com",
          phone: "123456",
          gender: "male",
          address: "address",
          country: "country",
          language: "language",
          company: "company",
          department: "department",
        },
      },
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
        status: "Accepted",
        createdAt: "2019-11-11T06:53:54.602Z",
        updatedAt: "2019-11-11T06:53:54.602Z",
        User: {
          image_url: "image",
          email: "usertest@gmail.com",
          phone: "123456",
          gender: "male",
          address: "address",
          country: "country",
          language: "language",
          company: "company",
          department: "department",
        },
      },
    ],
  },
};

const store = mockedStore(props);


describe("Host Reset Password", () => {
  const component = mount(
    <Provider store={store}>
      <Router>
        <HostResetComponent {...props} history={{ push: jest.fn() }} />
      </Router>
          ,
    </Provider>,
  );
  const component2 = shallow(
    <HostResetComponent {...props} history={{ push: jest.fn() }} />,
  );
  it("should render without crashing", () => {
    const nextPropsSuccess = { ...props };
    component.setProps(nextPropsSuccess);
    expect(component).toHaveLength(1);
  });
  it("should trigger componentWillReceiveProps", () => {
    const nextPropsError = {
      errors: {
        message: "Error message",
      },
      host: {
        passwordReset: true,
      },
    };
    component2.setProps(nextPropsError);
    expect(component.props()).toHaveProperty("host", props.host);
  });
  it("should trigger componentWillReceiveProps when password reset is false", () => {
    const nextPropsError = {
      errors: {
        message: "Error message",
      },
      host: {
        passwordReset: false,
      },
    };
    component2.setProps(nextPropsError);
    expect(component.props()).toHaveProperty("host", props.host);
  });
  it("should trigger componentWillReceiveProps when there is an array of errors", () => {
    const nextPropsError = {
      errors: {
        errors: [
          { message: "error message" },
          { message: "error message" },
        ],
      },
      host: {
        passwordReset: false,
      },
    };
    component2.setProps(nextPropsError);
    expect(component.props()).toHaveProperty("host", props.host);
  });
  it("should trigger componentWillReceiveProps when there is an error instead of a message", () => {
    const nextPropsError = {
      errors: {
        error: "Error message",
      },
      host: {
        passwordReset: true,
      },
    };
    component2.setProps(nextPropsError);
    expect(component.props()).toHaveProperty("host", props.host);
  });
  it("should simulate handleInputChange", () => {
    component2.find("#old_password").props().handler({
      target: { name: "old_password", value: "test123aA@" },
    });
    expect(component2.state().old_password).toBe(
      "test123aA@",
    );
  });
  it("should simulate handleInputChange catch an error", () => {
    component2.find("#email").props().handler({
      target: { name: "email", value: "test" },
    });
    expect(component2.state().email).toBe(
      "test",
    );
  });
  it("should simulate click", () => {
    component.find("form").simulate("submit");
    expect(resetHostPassword).toHaveBeenCalled();
  });
});
