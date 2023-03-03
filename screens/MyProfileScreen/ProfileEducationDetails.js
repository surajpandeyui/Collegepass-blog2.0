import { Row, Col, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import styles from "../MyProfileScreen/profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getEducationSection,
  updateEducationSection,
} from "../../actions/profileActions";
import { loadAccess, loadUser } from "../../actions/authActions";

const ProfileEducationDetails = () => {
  const dispatch = useDispatch();

  const educationData = useSelector(
    (state) => state.educationSection.educationData
  );

  const [grade, setGrade] = useState(0);
  const [gradeArray, setGradeArray] = useState([]);
  let gradeComponents = null;
  const [formData, setFormData] = useState({
    psat8_9: "",
    psatnmsqt: "",
    sat: "",
    act: "",
    checked: false,
  });

  const [testPlan, setTestPlan] = useState(false);
  const [gradeData, setGradeData] = useState([
    {
      grade_data_8: [
        {
          Grade: 8,
          SchoolName: "",
          SchoolCity: "",
          SchoolCountry: "",
          SchoolCurriculum: "",
          TotalGPA: "",
        },
      ],
      grade_data_9: [
        {
          Grade: 9,
          SchoolName: "",
          SchoolCity: "",
          SchoolCountry: "",
          SchoolCurriculum: "",
          TotalGPA: "",
        },
      ],
      grade_data_10: [
        {
          Grade: 10,
          SchoolName: "",
          SchoolCity: "",
          SchoolCountry: "",
          SchoolCurriculum: "",
          TotalGPA: "",
        },
      ],
      grade_data_11: [
        {
          Grade: 11,
          SchoolName: "",
          SchoolCity: "",
          SchoolCountry: "",
          SchoolCurriculum: "",
          TotalGPA: "",
        },
      ],
      grade_data_12: [
        {
          Grade: 12,
          SchoolName: "",
          SchoolCity: "",
          SchoolCountry: "",
          SchoolCurriculum: "",
          TotalGPA: "",
        },
      ],
    },
  ]);

  const { psat8_9, psatnmsqt, sat, act } = formData;

  useEffect(() => {
    dispatch(getEducationSection());
  }, [dispatch]);

  useEffect(() => {
    if (
      educationData?.grad_data_8 &&
      educationData?.grad_data_9 &&
      educationData?.grad_data_10 &&
      educationData?.grad_data_11 &&
      educationData?.grad_data_12
    ) {
      setGradeData([
        {
          grade_data_8: [
            {
              Grade: 8,
              SchoolName:
                educationData.grade_data_8[0].SCHOOL_NAME === null
                  ? ""
                  : educationData.grade_data_8[0].SCHOOL_NAME,
              SchoolCity:
                educationData.grade_data_8[0].SCHOOL_CITY === null
                  ? ""
                  : educationData.grade_data_8[0].SCHOOL_CITY,
              SchoolCountry:
                educationData.grade_data_8[0].SCHOOL_COUNTRY === null
                  ? ""
                  : educationData.grade_data_8[0].SCHOOL_COUNTRY,
              SchoolCurriculum:
                educationData.grade_data_8[0].SCHOOL_CURRICULUM === null
                  ? ""
                  : educationData.grade_data_8[0].SCHOOL_CURRICULUM,
              TotalGPA:
                educationData.grade_data_8[0].TOTAL_GPA === null
                  ? ""
                  : educationData.grade_data_8[0].TOTAL_GPA,
            },
          ],

          grade_data_9: [
            {
              Grade: 9,
              SchoolName:
                educationData.grade_data_9[0].SCHOOL_NAME === null
                  ? ""
                  : educationData.grade_data_9[0].SCHOOL_NAME,
              SchoolCity:
                educationData.grade_data_9[0].SCHOOL_CITY === null
                  ? ""
                  : educationData.grade_data_9[0].SCHOOL_CITY,
              SchoolCountry:
                educationData.grade_data_9[0].SCHOOL_COUNTRY === null
                  ? ""
                  : educationData.grade_data_9[0].SCHOOL_COUNTRY,
              SchoolCurriculum:
                educationData.grade_data_9[0].SCHOOL_CURRICULUM === null
                  ? ""
                  : educationData.grade_data_9[0].SCHOOL_CURRICULUM,
              TotalGPA:
                educationData.grade_data_9[0].TOTAL_GPA === null
                  ? ""
                  : educationData.grade_data_9[0].TOTAL_GPA,
            },
          ],
          grade_data_10: [
            {
              Grade: 10,
              SchoolName:
                educationData.grade_data_10[0].SCHOOL_NAME === null
                  ? ""
                  : educationData.grade_data_10[0].SCHOOL_NAME,
              SchoolCity:
                educationData.grade_data_10[0].SCHOOL_CITY === null
                  ? ""
                  : educationData.grade_data_10[0].SCHOOL_CITY,
              SchoolCountry:
                educationData.grade_data_10[0].SCHOOL_COUNTRY === null
                  ? ""
                  : educationData.grade_data_10[0].SCHOOL_COUNTRY,
              SchoolCurriculum:
                educationData.grade_data_10[0].SCHOOL_CURRICULUM === null
                  ? ""
                  : educationData.grade_data_10[0].SCHOOL_CURRICULUM,
              TotalGPA:
                educationData.grade_data_10[0].TOTAL_GPA === null
                  ? ""
                  : educationData.grade_data_10[0].TOTAL_GPA,
            },
          ],
          grade_data_11: [
            {
              Grade: 11,
              SchoolName:
                educationData.grade_data_11[0].SCHOOL_NAME === null
                  ? ""
                  : educationData.grade_data_11[0].SCHOOL_NAME,
              SchoolCity:
                educationData.grade_data_11[0].SCHOOL_CITY === null
                  ? ""
                  : educationData.grade_data_11[0].SCHOOL_CITY,
              SchoolCountry:
                educationData.grade_data_11[0].SCHOOL_COUNTRY === null
                  ? ""
                  : educationData.grade_data_11[0].SCHOOL_COUNTRY,
              SchoolCurriculum:
                educationData.grade_data_11[0].SCHOOL_CURRICULUM === null
                  ? ""
                  : educationData.grade_data_11[0].SCHOOL_CURRICULUM,
              TotalGPA:
                educationData.grade_data_11[0].TOTAL_GPA === null
                  ? ""
                  : educationData.grade_data_11[0].TOTAL_GPA,
            },
          ],
          grade_data_12: [
            {
              Grade: 12,
              SchoolName:
                educationData.grade_data_12[0].SCHOOL_NAME === null
                  ? ""
                  : educationData.grade_data_12[0].SCHOOL_NAME,
              SchoolCity:
                educationData.grade_data_12[0].SCHOOL_CITY === null
                  ? ""
                  : educationData.grade_data_12[0].SCHOOL_CITY,
              SchoolCountry:
                educationData.grade_data_12[0].SCHOOL_COUNTRY === null
                  ? ""
                  : educationData.grade_data_12[0].SCHOOL_COUNTRY,
              SchoolCurriculum:
                educationData.grade_data_12[0].SCHOOL_CURRICULUM === null
                  ? ""
                  : educationData.grade_data_12[0].SCHOOL_CURRICULUM,
              TotalGPA:
                educationData.grade_data_12[0].TOTAL_GPA === null
                  ? ""
                  : educationData.grade_data_12[0].TOTAL_GPA,
            },
          ],
        },
      ]);
    }

    if (educationData?.test_data) {
      setFormData({
        psat8_9: educationData.test_data[0].PSAT_8_9
          ? educationData.test_data[0].PSAT_8_9
          : "",
        psatnmsqt: educationData.test_data[0].PSAT_10
          ? educationData.test_data[0].PSAT_10
          : "",
        sat: educationData.test_data[0].SAT
          ? educationData.test_data[0].SAT
          : "",
        act: educationData.test_data[0].ACT
          ? educationData.test_data[0].ACT
          : "",
        testPlan: educationData.test_data[0].TEST_PLANNING === 1 ? true : false,
        checked: educationData.test_data[0].TEST_PLANNING !== 0 ? true : false,
      });

      setTestPlan(
        educationData.test_data[0].TEST_PLANNING === 1 ? true : false
      );

      if (educationData.test_data[0].GRADE) {
        setGrade(
          educationData.test_data[0].GRADE
            ? educationData.test_data[0].GRADE
            : 0
        );
        setGradesToArray(
          educationData.test_data[0].GRADE
            ? educationData.test_data[0].GRADE
            : 0
        );
      }
    }
  }, [educationData]);

  const templateGrade = {
    Grade: 12,
    SchoolName: "asddx",
    SchoolCountry: "asd",
    SchoolCity: "asd",
    SchoolCurriculum: "CBSEcd",
    TotalGPA: 4,
  };

  const gradeChangeHandler = (event) => {
    event.preventDefault();
    setGrade(parseInt(event.target.value));
    setGradesToArray(event.target.value);
  };

  const setGradesToArray = (value) => {
    switch (value) {
      case "12":
        setGradeArray([12, 11, 10, 9, 8]);
        setGradeData([...gradeData, templateGrade]);
        return grade;
      case "11":
        setGradeArray([11, 10, 9, 8]);
        return grade;

      case "10":
        setGradeArray([10, 9, 8]);
        return grade;

      case "9":
        setGradeArray([9, 8]);
        return grade;
      case "8":
        setGradeArray([8]);
        return grade;
      case "1":
        setGradeArray([12, 11, 10, 9, 8]);
        return grade;

      default:
        setGradeArray(null);
        return grade;
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChecked = (e) => {
    let new_checked_value = false;
    if (testPlan === true) {
      new_checked_value = false;
    } else if (testPlan === false) {
      new_checked_value = true;
    }
    setTestPlan(new_checked_value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let form_grade_data = [];

    form_grade_data[0] = gradeData[0].grade_data_8[0];

    form_grade_data[1] = gradeData[0].grade_data_9[0];

    form_grade_data[2] = gradeData[0].grade_data_10[0];

    form_grade_data[3] = gradeData[0].grade_data_11[0];

    form_grade_data[4] = gradeData[0].grade_data_12[0];

    let grade_id = 0;

    if (grade === 8) {
      grade_id = 1;
    } else if (grade === 9) {
      grade_id = 2;
    } else if (grade === 10) {
      grade_id = 3;
    } else if (grade === 11) {
      grade_id = 4;
    } else if (grade === 12) {
      grade_id = 5;
    } else if (grade === 1) {
      grade_id = 6;
    } else {
      grade_id = 0;
    }

    let body = {
      user_email: localStorage.user,
      grade_data: form_grade_data,
      CURRENT_GRADE: grade_id,
      PSAT8_9: psat8_9,
      PSATNMSQT: psatnmsqt,
      SAT: sat,
      ACT: act,
      TEST_PLANNING: testPlan,
    };

    dispatch(updateEducationSection(body));

    dispatch(loadUser());
    dispatch(loadAccess());
  };

  if (gradeArray) {
    gradeComponents = gradeArray.map((userGrade) => {
      let tempValue = null;

      if (userGrade === 12) {
        tempValue = gradeData[0].grade_data_12[0];
      } else if (userGrade === 11) {
        tempValue = gradeData[0].grade_data_11[0];
      } else if (userGrade === 10) {
        tempValue = gradeData[0].grade_data_10[0];
      } else if (userGrade === 9) {
        tempValue = gradeData[0].grade_data_9[0];
      } else if (userGrade === 8) {
        tempValue = gradeData[0].grade_data_8[0];
      }

      return (
        <div
          key={userGrade}
          id={userGrade}
          className="col-md-12 form-group-custom"
        >
          <label className="gheading">{`Grade ${userGrade}th Details:`}</label>
          <div className="form-group row">
            <label
              htmlFor={`school${userGrade}`}
              className="col-md-4 col-form-label"
            >
              School Name
            </label>
            <div className="col-md-8">
              <input
                value={tempValue.SchoolName ? tempValue.SchoolName : ""}
                onChange={(e) => {
                  let main_data = [...gradeData];

                  if (userGrade === 12) {
                    main_data[0].grade_data_12[0].SchoolName = e.target.value;
                  } else if (userGrade === 11) {
                    main_data[0].grade_data_11[0].SchoolName = e.target.value;
                  } else if (userGrade === 10) {
                    main_data[0].grade_data_10[0].SchoolName = e.target.value;
                  } else if (userGrade === 9) {
                    main_data[0].grade_data_9[0].SchoolName = e.target.value;
                  } else if (userGrade === 8) {
                    main_data[0].grade_data_8[0].SchoolName = e.target.value;
                  }

                  setGradeData(main_data);
                }}
                name={`schoolName${userGrade}`}
                placeholder="Enter the School Name"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor={`school_city${userGrade}`}
              className="col-md-4 col-form-label"
            >
              School Location
            </label>
            <div className="col-md-4">
              <input
                type="text"
                value={tempValue.SchoolCity ? tempValue.SchoolCity : ""}
                onChange={(e) => {
                  let main_data = [...gradeData];

                  if (userGrade === 12) {
                    main_data[0].grade_data_12[0].SchoolCity = e.target.value;
                  } else if (userGrade === 11) {
                    main_data[0].grade_data_11[0].SchoolCity = e.target.value;
                  } else if (userGrade === 10) {
                    main_data[0].grade_data_10[0].SchoolCity = e.target.value;
                  } else if (userGrade === 9) {
                    main_data[0].grade_data_9[0].SchoolCity = e.target.value;
                  } else if (userGrade === 8) {
                    main_data[0].grade_data_8[0].SchoolCity = e.target.value;
                  }

                  setGradeData(main_data);
                }}
                name={`schoolCity${userGrade}`}
                placeholder="Enter City Name"
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                value={tempValue.SchoolCountry ? tempValue.SchoolCountry : ""}
                onChange={(e) => {
                  let main_data = [...gradeData];

                  if (userGrade === 12) {
                    main_data[0].grade_data_12[0].SchoolCountry =
                      e.target.value;
                  } else if (userGrade === 11) {
                    main_data[0].grade_data_11[0].SchoolCountry =
                      e.target.value;
                  } else if (userGrade === 10) {
                    main_data[0].grade_data_10[0].SchoolCountry =
                      e.target.value;
                  } else if (userGrade === 9) {
                    main_data[0].grade_data_9[0].SchoolCountry = e.target.value;
                  } else if (userGrade === 8) {
                    main_data[0].grade_data_8[0].SchoolCountry = e.target.value;
                  }

                  setGradeData(main_data);
                }}
                name={`schoolCountry${userGrade}`}
                placeholder="Enter Country Name"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor={`school_curriculum${userGrade}`}
              className="col-md-4 col-form-label"
            >
              School Curriculum
            </label>
            <div className="col-md-4">
              <input
                type="text"
                value={
                  tempValue.SchoolCurriculum ? tempValue.SchoolCurriculum : ""
                }
                onChange={(e) => {
                  let main_data = [...gradeData];

                  if (userGrade === 12) {
                    main_data[0].grade_data_12[0].SchoolCurriculum =
                      e.target.value;
                  } else if (userGrade === 11) {
                    main_data[0].grade_data_11[0].SchoolCurriculum =
                      e.target.value;
                  } else if (userGrade === 10) {
                    main_data[0].grade_data_10[0].SchoolCurriculum =
                      e.target.value;
                  } else if (userGrade === 9) {
                    main_data[0].grade_data_9[0].SchoolCurriculum =
                      e.target.value;
                  } else if (userGrade === 8) {
                    main_data[0].grade_data_8[0].SchoolCurriculum =
                      e.target.value;
                  }

                  setGradeData(main_data);
                }}
                name={`schoolCurriculum${userGrade}`}
                placeholder="Enter School Curriculum"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor={`gpa${userGrade}`}
              className="col-md-4 col-form-label"
            >
              Total GPA / Percentage
            </label>
            <div className="col-md-8">
              <input
                type="text"
                value={tempValue.TotalGPA ? tempValue.TotalGPA : ""}
                onChange={(e) => {
                  let main_data = [...gradeData];

                  if (userGrade === 12) {
                    main_data[0].grade_data_12[0].TotalGPA = e.target.value;
                  } else if (userGrade === 11) {
                    main_data[0].grade_data_11[0].TotalGPA = e.target.value;
                  } else if (userGrade === 10) {
                    main_data[0].grade_data_10[0].TotalGPA = e.target.value;
                  } else if (userGrade === 9) {
                    main_data[0].grade_data_9[0].TotalGPA = e.target.value;
                  } else if (userGrade === 8) {
                    main_data[0].grade_data_8[0].TotalGPA = e.target.value;
                  }

                  setGradeData(main_data);
                }}
                name={`gpa${userGrade}`}
                placeholder="Enter the Total GPA / Percentage"
                className="form-control"
              />
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <Row>
      <Col className={styles.myProfile}>
        <Row>
          <Col>
            <Form
              className={styles.profileEducation}
              name="profile_grade_form"
              id="profile_grade_form"
              onSubmit={onSubmit}
            >
              <Row className="form-group">
                <Col lg={4} md={4} sm={4} xs={4}>
                  <label className="col-form-label">Grade*</label>
                </Col>
                <Col lg={8} md={8} sm={8} xs={8}>
                  <select
                    id="grade"
                    name="GRADE"
                    className="custom-select"
                    onChange={gradeChangeHandler}
                    value={grade}
                  >
                    <option value={0}>Select Grade</option>
                    <option value={8}>Grade 8</option>
                    <option value={9}>Grade 9</option>
                    <option value={10}>Grade 10</option>
                    <option value={11}>Grade 11</option>
                    <option value={12}>Grade 12</option>
                  </select>
                </Col>
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  //   key={userGrade}
                  //   id={userGrade}
                  className="form-group-custom"
                >
                  <label className="gheading"></label>
                  <Row className="form-group">
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <label className="col-md-4 col-form-label">
                        School Name
                      </label>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={8}>
                      <input
                        //value=""
                        //name={`schoolName${userGrade}`}
                        placeholder="Enter the School Name"
                        className="form-control"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group row">
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <label
                        //htmlFor={`school_city${userGrade}`}
                        className="col-form-label"
                      >
                        School Location
                      </label>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <input
                        type="text"
                        //value={}
                        //name=""
                        placeholder="Enter City Name"
                        className="form-control"
                      />
                    </Col>

                    <Col lg={4} md={4} sm={4} xs={4}>
                      <input
                        type="text"
                        //value={}
                        //name={}
                        placeholder="Enter Country Name"
                        className="form-control"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <label
                        //htmlFor={`school_curriculum${userGrade}`}
                        className="col-form-label"
                      >
                        School Curriculum
                      </label>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <input
                        type="text"
                        //value={}
                        //name={`schoolCurriculum${userGrade}`}
                        placeholder="Enter School Curriculum"
                        className="form-control"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <label
                        //htmlFor={`gpa${userGrade}`}
                        className="col-md-4 col-form-label"
                      >
                        Total GPA / Percentage
                      </label>
                    </Col>
                    <Col lg={8} md={8} sm={8} xs={8}>
                      <input
                        type="text"
                        //value={}
                        //name={`gpa${userGrade}`}
                        placeholder="Enter the Total GPA / Percentage"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="form-group">
                <Col lg={4} md={4} sm={4} xs={4}>
                  <label htmlFor="state" className="col-form-label">
                    PSAT 8/9 (If Applicable : Score Out of 1440)
                  </label>
                </Col>
                <Col lg={8} md={8} sm={8} xs={8}>
                  <input
                    type="number"
                    //value={psat8_9}
                    //onChange={onChange}
                    name="psat8_9"
                    placeholder="Enter the PSAT 8/9 Score"
                    max="1440"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col lg={4} md={4} sm={4} xs={4}>
                  <label htmlFor="state" className="col-form-label">
                    PSAT NMSQT/10 (If Applicable : Score Out of 1520)
                  </label>
                </Col>
                <Col lg={8} md={8} sm={8} xs={8}>
                  <input
                    type="number"
                    //value={psatnmsqt}
                    //onChange={onChange}
                    name="psatnmsqt"
                    placeholder="Enter the PSAT NMSQT/10 Score"
                    max="1520"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col lg={4} md={4} sm={4} xs={4}>
                  <label htmlFor="state" className="col-form-label">
                    SAT (If Applicable : Score Out of 1600)
                  </label>
                </Col>
                <Col lg={8} md={8} sm={8} xs={8}>
                  <input
                    type="number"
                    //value={sat}
                    //onChange={onChange}
                    name="sat"
                    placeholder="Enter the SAT Score"
                    max="1600"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col lg={4} md={4} sm={4} xs={4}>
                  <label htmlFor="state" className="col-form-label">
                    ACT (If Applicable : Score Out of 36)
                  </label>
                </Col>
                <Col lg={8} md={8} sm={8} xs={8}>
                  <input
                    type="number"
                    //value={act}
                    //onChange={onChange}
                    name="act"
                    placeholder="Enter the ACT Score"
                    max="36"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="custom-checkbox test-planning">
                <Col>
                  <label>
                    {/*<Checkbox
                                        checked={testPlan || false}
                                        onChange={handleChecked}
                                        value={testPlan}
                                        className="custom-input"
                                        name="testPlan"
                                        />*/}
                    If you don&apos;t have PSAT/SAT/ACT Score, are you planning
                    to give?
                  </label>
                </Col>
              </Row>

              <Row className="form-group">
                <Col lg={12} md={12} sm={12} xs={12} className="text-right">
                  <Button
                    name="submit"
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
      </Col>
    </Row>
  );
};

export default ProfileEducationDetails;
