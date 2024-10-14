import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import Modal from "@mui/material/Modal";
import { FaPlus } from "react-icons/fa6";
import { styled } from "@mui/system";
import axios from "axios";
import CreateCaseFormModal from "./CreateCaseFormModal";

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "48%",
  transform: "translate(-50%, -50%)",
  background: "white",
  outline: "none",

  "@media (max-width: 767px)": {
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    border: "none",
  },
});

const majorViolation = [
  "Smoking or vaping",
  "Possession of alcoholic beverages or coming to school under the influence of alcohol",
  "Tampering of posters or other school information media",
  "Refusal to submit to reasonable inspection conducted by authorized personnel",
  "Bringing outsiders or providing any means for entry in the University premises without consent of the concerned authority",
  "Ridiculing of fellow students / Rumor mongering",
  "Failure to appear before school authorities when required to report within 48 hours without valid reason",
  "Lewd Act / Boisterous remark / Use of profane or indecent language (e.g., catcalling, etc.)",
  "Public Display of Affection such as, but not limited to embracing, petting, kissing, suggestive, vulgar, or indecent poses",
  "Unauthorized use of PLV logo or seal, or other university markers or symbols including accredited students' organizations",
  "Unauthorized representation to any activity / event / opportunity in behalf of the University, student organization, student, council officer, school authorities, or officials",
  "Willful affiliation with any unrecognized organization within PLV",
  "Physical, verbal, or written assault on student, organization, or school authorities",
  "Lending or borrowing one's ID, COR, or Library Card for the use of another person / Other forms of misrepresentation",
  "Use of class / organizational funds for personal benefit",
  "Unauthorized solicitation or collection of money from students and other school authorities",
  "Vandalism / Defacing walls / Tearing pages from library materials or school documents / Unauthorized removal of official notices and posters",
  "Destruction of school properties / equipment",
  "Any form of coercion or threat against any student, faculty member, University guest, or any school authority",
  "Disrespect towards school personnel, faculty members, or school authorities",
  "Possession of pornographic material/s in any form",
  "Unauthorized possession and/or use of playing cards or devices inside the school premises / Indulging in any form of betting or gathering",
  "Any form of cheating during examinations or in any academic work",
  "Plagiarism or submission of another person's work and claiming it as his/her own",
  "Any form of bullying, harassment, threat, or intimidation against students, school personnel, faculty members, and school authorities",
  "Membership in gangs, fraternities, sororities, or recruitment of students to the same",
  "Any form hazing or infliction of physical or mental harm or ordeal to student as a requirement for entry to student organizations in the university",
  "Illegal possession, use, sale, or disposal of prohibited drugs",
  "Arson",
  "Grave sexual misconduct constituting a criminal offense (such as, but not limited to, acts of lasciviousness)",
  "Rebellious actions such as, but not limited to, pressuring others to boycott classes, or leading or participating in unauthorized activities",
  "Organizing (what type of group) groups and/or inviting membership to unrecognized/accredited organizations or groups by PLV",
  "Any form of falsification, tampering, or submission of fraudulent school records or credentials, such as, but not limited to, I.D., Receipt, and other documents / materials",
  "Carrying deadly weapons of any kind (firearms, knives, and the likes) or possession of explosives",
  "Inflicting physical injury / assault on students, school personnel, faculty members, or school authorities without provocation on the part of the latter",
  "Any form of stealing, swindling, or extortion rebellious",
  "Disclosing or misusing confidential or classified school information",
  "Posting of statements through any system of communication, channel, or publications, which damage the reputation of the university or its community",
  "Bring dishonor to the University",
];

const minorViolation = [
  "Incomplete uniform",
  "Sporting very sophisticated hair style, clothing, and accessories",
  "Unkempt / Long hair for boys",
  "Hair dyeing",
  "Sporting visible tattoos",
  "Excessive body piercing",
  "Littering",
  "Loitering",
  "Unauthorized use of classrooms and other school facilities and supplements",
  "Unauthorized entry to restricted and designated areas",
];

const initialState = {
  student: "",
  studentNo: "",
  studentName: "",
  year: "",
  reportedViolation: "",
  typeOfViolations: ["Major", "Minor"],
  typeOfViolation: "",
  dateOfIncident: Date,
  dateReported: Date,
  dismissalDate: Date,
  appeal: false,
  remarks: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateCase = ({ toast, getCases, allowedRoles }) => {
  const [values, setValues] = useState(initialState);
  const [showCreateCaseModal, setShowCreateCaseModal] = useState(false);
  const [students, setStudents] = useState([]);

  const auth = useSelector(authSelector);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.get(`${process.env.REACT_APP_API_URI}/student`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching cases:", err);
    }
  };

  const handleCreateCase = async (e) => {
    e.preventDefault();

    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URI}/case`,
        values,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      await toast.success(res?.data?.message);
      setValues(initialState);
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      handleCloseModal();
      getCases();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    const { name, value } = e.target;
    // let newErrors = { ...errors };

    let formattedValue = value;

    // if (name === "firstName" || name === "middleName" || name === "surName") {
    //   formattedValue =
    //     value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    // }

    setValues({ ...values, [name]: formattedValue });

    // if (name === "caseNo") {
    //   if (value.length < 3) {
    //     newErrors[name] = "First name must be at least 3 characters long.";
    //   } else if (value.length > 48) {
    //     newErrors[name] = "First name must be at most 48 characters long.";
    //   } else {
    //     newErrors[name] = "";
    //   }
    // }
    // setErrors(newErrors);
  };

  const handleDateOfIncidentChange = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    if (dayOfWeek === "Sunday") {
      toast.error(
        "Office of Student Affairs does not process cases on Sundays. Please try again on another day!"
      );
    } else {
      setValues({
        ...values,
        dateOfIncident: date,
      });
    }
  };

  const handleDateReportedChange = (date) => {
    const dateObj = new Date(date);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    if (dayOfWeek === "Sunday") {
      toast.error("Closed on Sundays");
    } else {
      setValues({
        ...values,
        dateReported: date,
      });
    }
  };

  const handleCaseOwnerChange = (e) => {
    const selectedName = e.target.value;
    const selectedStudentId =
      e.target.options[e.target.selectedIndex].getAttribute("data-student");
    const selectedYear =
      e.target.options[e.target.selectedIndex].getAttribute("data-year");

    setValues({
      ...values,
      studentName: selectedName,
      student: selectedStudentId,
      year: selectedYear,
    });
  };

  // create student modal functions

  const handleOpenModal = () => {
    setShowCreateCaseModal(true);
  };

  const handleCloseModal = async () => {
    try {
      setShowCreateCaseModal(false);
      setValues(initialState);
    } catch (error) {
      console.error("An error occurred while handling modal closure:", error);
    } finally {
      getStudents();
    }
  };

  console.log(auth.userDetails.role);

  return (
    <>
      <div className="w-100 text-[14px] text-[#404040] pb-6 ">
        Office of Student Affairs / Cases
      </div>
      <div className="w-100 text-[26px] text-[#077bff] font-semibold pb-6 flex justify-between items-center">
        <div>Cases List</div>

        {allowedRoles?.find((ar) => auth?.userDetails?.role?.includes(ar)) ? (
          <div
            onClick={handleOpenModal}
            className="cursor-pointer py-3 px-4 bg-gradient-to-br from-[#007bff] via-[#079bff] to-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[32px]"
          >
            <FaPlus />
            <div>Add Case</div>
          </div>
        ) : (
          <div className="cursor-pointer py-3 px-3 bg-gray-100 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]">
            <FaPlus />
            <div>Add Case</div>
          </div>
        )}
      </div>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showCreateCaseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateCaseFormModal
            students={students}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleDateOfIncidentChange={handleDateOfIncidentChange}
            handleDateReportedChange={handleDateReportedChange}
            handleCreateCase={handleCreateCase}
            handleCloseModal={handleCloseModal}
            majorViolation={majorViolation}
            minorViolation={minorViolation}
            handleCaseOwnerChange={handleCaseOwnerChange}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default CreateCase;
