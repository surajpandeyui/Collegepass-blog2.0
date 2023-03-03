import { Row, Col, Form, Button } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import React, { useState, useEffect } from "react";
import styles from "../MyProfileScreen/profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getPersonalSection,
  updatePersonalSection,
} from "../../actions/profileActions";
import {
  getCountryArray,
  getStateArrayByCountryIDInside,
  getStateArrayByCountryIDHundret,
  getCityArrayByStateIDInside,
} from "../../actions/getCityStateCountryArrayActions";
import { getCirriculam } from "../../actions/eventRegistrationActions";

const ProfilePersonalDetails = () => {
  const dispatch = useDispatch();

  const personalData = useSelector(
    (state) => state.personalSection.personalData
  );
  const countryArr = useSelector((state) => state.countryArray.countryArray);
  const stateArr = useSelector(
    (state) => state.stateArrayByCountryIDInside.stateArray
  );
  const cityArr = useSelector(
    (state) => state.cityArrayByStateIDInside.cityArray
  );
  const curr = useSelector((state) => state.cirriculam.cirriculam);

  useEffect(() => {
    dispatch(getPersonalSection());
    dispatch(getCountryArray());
    dispatch(getCirriculam());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    fName: "",
    lname: "",
    emailId: "",
    phone: "",
    altPhone: "",
    gender: "male",
    curriculum: 1,
    schooName: "",
    country: 101,
    city: 1558,
    state: 17,
  });

  const {
    fName,
    lname,
    emailId,
    phone,
    altPhone,
    gender,
    curriculum,
    schooName,
    country,
    city,
    state,
  } = formData;

  const [selectedCountries, setCountries] = useState([]);
  const countryHandleOnchange = function (selectedList, selectedItem) {
    const countries = [];
    for (let i = 0; i < selectedList.length; i++) {
      countries.push({
        label: selectedList[i].label,
        value: selectedList[i].value,
      });
    }
    setCountries(countries);
  };

  const countryHandleOnRemove = function (selectedList, selectedItem) {
    const index = selectedCountries.findIndex(
      (x) => x.value === selectedItem.value
    );
    if (index > -1) {
      selectedCountries.splice(index, 1);
    }
  };

  const countryOptions = [
    { label: "India", value: 1 },
    { label: "UK", value: 2 },
    { label: "USA", value: 3 },
    { label: "Canada", value: 4 },
    // { label:  'Germany', value:  5  },
    { label: "Singapore/HongKong", value: 6 },
    // { label:  'Japan', value:  7  },
    // { label:  'Thailand', value:  8 },
    { label: "Australia/New Zealand", value: 9 },
    { label: "Europe", value: 58 },
    // { label:  'Ireland', value:  10  },
    // { label:  'HongKong', value:  11  },
    // { label:  'Russia', value:  12  },
    // { label:  'Switzerland', value:  13  },
    // { label:  'France', value:  14  },
  ];

  const [selectedCareer, setCareer] = useState([]);
  const careerHandleOnchange = function (selectedList, selectedItem) {
    const career = [];
    for (let i = 0; i < selectedList.length; i++) {
      career.push({
        label: selectedList[i].label,
        value: selectedList[i].value,
      });
    }
    setCareer(career);
  };

  const careerHandleOnRemove = function (selectedList, selectedItem) {
    const index = selectedCareer.findIndex(
      (x) => x.value === selectedItem.value
    );
    if (index > -1) {
      selectedCareer.splice(index, 1);
    }
  };

  const careerOptions = [
    { label: "Engineering", value: 15 },
    { label: "Computer Application & IT", value: 16 },
    { label: "Ethical Hacking", value: 17 },
    { label: "Aviation", value: 18 },
    { label: "Architecture", value: 19 },
    { label: "Merchant Navy", value: 20 },
    { label: "Food & Agriculture", value: 21 },
    { label: "Physical Science", value: 22 },
    { label: "Life Science & Environment", value: 23 },
    { label: "Maths & Statistics", value: 24 },
    { label: "Allied Medicine", value: 25 },
    { label: "Nutrition & Fitness", value: 26 },
    { label: "Design", value: 27 },
    { label: "Animation & Graphics", value: 28 },
    { label: "Media & Communication", value: 29 },
    { label: "Applied Arts", value: 30 },
    { label: "Performing Arts", value: 31 },
    { label: "Hotel Management", value: 32 },
    { label: "Civil Services", value: 33 },
    { label: "Marketing & Advertising", value: 34 },
    { label: "Sales", value: 35 },
    { label: "Management", value: 36 },
    { label: "Entrepreneurship", value: 37 },
    { label: "Law", value: 38 },
    { label: "Finance & Banking", value: 39 },
    { label: "Commerce & Accounts", value: 40 },
    { label: "Actuarial Sciences", value: 41 },
    { label: "Economics", value: 42 },
    { label: "Social Sciences & Humanities", value: 43 },
    { label: "Education & Training", value: 44 },
    { label: "Distribution & Logistics", value: 45 },
  ];

  useEffect(() => {
    if (personalData?.data) {
      setFormData({
        fName: personalData.data[0].FIRSTNAME
          ? personalData.data[0].FIRSTNAME
          : "",
        lname: personalData.data[0].LASTNAME
          ? personalData.data[0].LASTNAME
          : "",
        emailId: personalData.data[0].EMAIL ? personalData.data[0].EMAIL : "",
        phone: personalData.data[0].PHONENUMBER
          ? personalData.data[0].PHONENUMBER
          : "",
        altPhone: personalData.data[0].ALTERNATECONTACT
          ? personalData.data[0].ALTERNATECONTACT
          : "",
        gender: personalData.data[0].GENDER
          ? personalData.data[0].GENDER
          : "male",
        curriculum: personalData.data[0].CURRICULUM
          ? personalData.data[0].CURRICULUM
          : "",
        schooName: personalData.data[0].SCHOOL
          ? personalData.data[0].SCHOOL
          : "",
        city: personalData.data[0].CITY ? personalData.data[0].CITY : 1558,
        state: personalData.data[0].STATE ? personalData.data[0].STATE : 17,
        country: personalData.data[0].COUNTRY
          ? personalData.data[0].COUNTRY
          : 101,
      });

      const countryInside = null;
      if (personalData.data[0].COUNTRY) {
        countryInside = personalData.data[0].COUNTRY;
      } else {
        countryInside = 101;
      }
      dispatch(getStateArrayByCountryIDInside(countryInside));

      const stateInside = null;
      if (personalData.data[0].STATE) {
        stateInside = personalData.data[0].STATE;
      } else {
        stateInside = 17;
      }
      dispatch(getCityArrayByStateIDInside(stateInside));
    }

    if (personalData?.careerChoice && personalData?.careerChoice.length > 0) {
      let userCareer = [];
      for (let single_data of personalData.careerChoice) {
        userCareer.push({
          label: single_data.TAG_NAME,
          value: single_data.TAG_ID,
        });
      }
      setCareer(userCareer);
    }

    if (personalData?.countryChoice && personalData?.countryChoice.length > 0) {
      let userCountries = [];
      for (let single_data of personalData.countryChoice) {
        userCountries.push({
          label: single_data.TAG_NAME,
          value: single_data.TAG_ID,
        });
      }
      setCountries(userCountries);
    }
  }, [personalData, dispatch]);

  const onChangeHandler = (e) => {
    e.persist();
    if (e.target.name === "country") {
      const countryInside = e.target.value;
      dispatch(getStateArrayByCountryIDInside(countryInside));

      setFormData({
        ...formData,
        country: countryInside,
      });
    } else if (e.target.name === "state") {
      const stateInside = e.target.value;
      dispatch(getCityArrayByStateIDInside(stateInside));

      setFormData({
        ...formData,
        state: stateInside,
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const submitCareer = [];
    for (let i = 0; i < selectedCareer.length; i++) {
      submitCareer.push(selectedCareer[i].value);
    }

    const submitCountry = [];
    for (let i = 0; i < selectedCountries.length; i++) {
      submitCountry.push(selectedCountries[i].value);
    }

    const body = {
      user_email: localStorage.user,
      profile_data: {
        user_type: "STUDENT",
        fName: fName,
        lname: lname,
        emailId: localStorage.user,
        phone: phone,
        altPhone: altPhone,
        gender: gender,
        curriculum: curriculum ? curriculum : 1,
        schooName: schooName,
        country: country,
        state: state,
        city: city,
        intrested_country: submitCountry.join(","),
        intrested_career: submitCareer.join(","),
      },
    };

    dispatch(updatePersonalSection(body));
  };

  let countryComponent = null;
  let stateComponent = null;
  let cityComponent = null;
  let currOptions = null;

  if (countryArr) {
    countryComponent = countryArr.map((country) => {
      return (
        <option key={country.id} value={country.id}>
          {country.name}
        </option>
      );
    });
  }

  if (stateArr) {
    stateComponent = stateArr.map((state) => {
      return (
        <option key={state.id} value={state.id}>
          {state.name}
        </option>
      );
    });
  }

  if (cityArr) {
    cityComponent = cityArr.map((city) => {
      return (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      );
    });
  }

  if (curr) {
    currOptions = curr.map((count) => {
      return (
        <option key={count.ID} value={count.ID} name={count.NAME}>
          {count.NAME}
        </option>
      );
    });
  }

  return (
    <Row>
      <Col className={styles.myProfile}>
        <Form className={styles.profilePersonal} onSubmit={onSubmit}>
          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="select" className="col-form-label">
                I am
              </label>
            </Col>

            <Col lg={10} md={10} sm={10} xs={10}>
              <select
                id="user_type"
                name="user_type"
                className="custom-select"
                disabled="disabled"
              >
                <option value="Student">Student</option>
              </select>
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="first_name" className="col-form-label">
                First Name*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <input
                type="text"
                value={fName}
                onChange={onChangeHandler}
                name="fName"
                placeholder="Enter The First Name"
                className="form-control"
                required="required"
              />
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="text1" className="col-form-label">
                Last Name*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <input
                type="text"
                value={lname}
                onChange={onChangeHandler}
                name="lname"
                placeholder="Enter The Last Name"
                className="form-control"
                required="required"
              />
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="text2" className="col-form-label">
                Email*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <input
                type="email"
                value={emailId}
                onChange={onChangeHandler}
                name="emailId"
                placeholder="Enter The Email"
                className="form-control"
                required="required"
                disabled={true}
              />
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="text2" className="col-form-label">
                Phone*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <input
                type="tel"
                value={phone}
                onChange={onChangeHandler}
                name="phone"
                placeholder="Enter The Phone Number"
                // pattern="[0-9]{10}"
                className="form-control"
                required="required"
              />
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="text2" className="col-form-label">
                Alternate Phone
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <input
                type="tel"
                value={altPhone}
                onChange={onChangeHandler}
                name="altPhone"
                placeholder="Enter The Alternate Number"
                // pattern="[0-9]{10}"
                className="form-control"
              />
            </Col>
          </Row>

          <Row className="form-group row">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label>Gender*</label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10} className="d-flex mt-2 mb-2">
              <Row>
                <Col className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    value="male"
                    onChange={onChangeHandler}
                    name="gender"
                    id="gender_m"
                    className="custom-input"
                    checked={gender === "male"}
                  />
                  <label
                    htmlFor="gender_m"
                    className="custom-control-label personallheightlab"
                  >
                    Male
                  </label>
                </Col>
              </Row>
              <Row>
                <Col className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    value="female"
                    onChange={onChangeHandler}
                    name="gender"
                    id="gender_f"
                    className="custom-input"
                    checked={gender === "female"}
                  />
                  <label
                    htmlFor="gender_f"
                    className="custom-control-label personallheightlab"
                  >
                    Female
                  </label>
                </Col>
              </Row>
              <Row>
                <Col className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    value="none"
                    onChange={onChangeHandler}
                    name="gender"
                    id="gender_other"
                    className="custom-input"
                    checked={gender === "none"}
                  />
                  <label
                    htmlFor="gender_other"
                    className="custom-control-label personallheightlab"
                  >
                    Don&apos;t Wish To Disclose
                  </label>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="curriculum" className="col-form-label">
                Curriculum*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <select
                id="curriculum"
                onChange={onChangeHandler}
                name="curriculum"
                className="custom-select"
                required="required"
                value={curriculum}
              >
                <option value={""}>Select Curriculum</option>
                {currOptions}
              </select>
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="school_name" className="col-form-label">
                School Name*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <input
                type="text"
                value={schooName}
                onChange={onChangeHandler}
                name="schooName"
                placeholder="Enter The School Name"
                className="form-control"
              />
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="country" className="col-form-label">
                Country*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <select
                id="country"
                onChange={onChangeHandler}
                name="country"
                className="custom-select"
                required="required"
                value={country}
              >
                <option values={""}>Country</option>
                {countryComponent}
              </select>
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="state" className="col-form-label">
                State
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <select
                id="state"
                onChange={onChangeHandler}
                name="state"
                className="custom-select"
                value={state}
              >
                <option values={""}>State</option>
                {stateComponent}
              </select>
            </Col>
          </Row>
          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="city" className="col-form-label">
                City
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <select
                id="city"
                onChange={onChangeHandler}
                name="city"
                className="custom-select"
                value={city}
              >
                <option values={""}>City</option>
                {cityComponent}
              </select>
            </Col>
          </Row>

          <Row className="form-group">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="country" className="col-form-label">
                Choice of Country*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <Multiselect
                options={countryOptions}
                displayValue="label"
                selectedValues={selectedCountries}
                onSelect={countryHandleOnchange}
                onRemove={countryHandleOnRemove}
              />
            </Col>
          </Row>

          <Row className="form-group row">
            <Col lg={2} md={2} sm={2} xs={2}>
              <label htmlFor="country" className="col-form-label">
                Choice of Career*
              </label>
            </Col>
            <Col lg={10} md={10} sm={10} xs={10}>
              <Multiselect
                options={careerOptions}
                displayValue="label"
                selectedValues={selectedCareer}
                onSelect={careerHandleOnchange}
                onRemove={careerHandleOnRemove}
              />
            </Col>
          </Row>

          <Row className="form-group row text-right">
            <Col lg={12} md={12} sm={12} xs={12} className="offset-4">
              <Button
                type="submit"
                className="btn btn-resume nexttab btn-direction"
              >
                Continue
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfilePersonalDetails;
