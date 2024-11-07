import React, { useState, useEffect } from 'react';
import { BsChevronBarDown, BsFilter } from 'react-icons/bs';
import CasesPerMonthBarChart from '../statisticsUtils/CasesPerMonthBarChart';

const majorViolation = [
  'Smoking or vaping',
  'Possession of alcoholic beverages or coming to school under the influence of alcohol',
  'Tampering of posters or other school information media',
  'Refusal to submit to reasonable inspection conducted by authorized personnel',
  'Bringing outsiders or providing any means for entry in the University premises without consent of the concerned authority',
  'Ridiculing of fellow students / Rumor mongering',
  'Failure to appear before school authorities when required to report within 48 hours without valid reason',
  'Lewd Act / Boisterous remark / Use of profane or indecent language (e.g., catcalling, etc.)',
  'Public Display of Affection such as, but not limited to embracing, petting, kissing, suggestive, vulgar, or indecent poses',
  "Unauthorized use of PLV logo or seal, or other university markers or symbols including accredited students' organizations",
  'Unauthorized representation to any activity / event / opportunity in behalf of the University, student organization, student, council officer, school authorities, or officials',
  'Willful affiliation with any unrecognized organization within PLV',
  'Physical, verbal, or written assault on student, organization, or school authorities',
  "Lending or borrowing one's ID, COR, or Library Card for the use of another person / Other forms of misrepresentation",
  'Use of class / organizational funds for personal benefit',
  'Unauthorized solicitation or collection of money from students and other school authorities',
  'Vandalism / Defacing walls / Tearing pages from library materials or school documents / Unauthorized removal of official notices and posters',
  'Destruction of school properties / equipment',
  'Any form of coercion or threat against any student, faculty member, University guest, or any school authority',
  'Disrespect towards school personnel, faculty members, or school authorities',
  'Possession of pornographic material/s in any form',
  'Unauthorized possession and/or use of playing cards or devices inside the school premises / Indulging in any form of betting or gathering',
  'Any form of cheating during examinations or in any academic work',
  "Plagiarism or submission of another person's work and claiming it as his/her own",
  'Any form of bullying, harassment, threat, or intimidation against students, school personnel, faculty members, and school authorities',
  'Membership in gangs, fraternities, sororities, or recruitment of students to the same',
  'Any form hazing or infliction of physical or mental harm or ordeal to student as a requirement for entry to student organizations in the university',
  'Illegal possession, use, sale, or disposal of prohibited drugs',
  'Arson',
  'Grave sexual misconduct constituting a criminal offense (such as, but not limited to, acts of lasciviousness)',
  'Rebellious actions such as, but not limited to, pressuring others to boycott classes, or leading or participating in unauthorized activities',
  'Organizing (what type of group) groups and/or inviting membership to unrecognized/accredited organizations or groups by PLV',
  'Any form of falsification, tampering, or submission of fraudulent school records or credentials, such as, but not limited to, I.D., Receipt, and other documents / materials',
  'Carrying deadly weapons of any kind (firearms, knives, and the likes) or possession of explosives',
  'Inflicting physical injury / assault on students, school personnel, faculty members, or school authorities without provocation on the part of the latter',
  'Any form of stealing, swindling, or extortion rebellious',
  'Disclosing or misusing confidential or classified school information',
  'Posting of statements through any system of communication, channel, or publications, which damage the reputation of the university or its community',
  'Bring dishonor to the University',
];

const minorViolation = [
  'Incomplete uniform',
  'Sporting very sophisticated hair style, clothing, and accessories',
  'Unkempt / Long hair for boys',
  'Hair dyeing',
  'Sporting visible tattoos',
  'Excessive body piercing',
  'Littering',
  'Loitering',
  'Unauthorized use of classrooms and other school facilities and supplements',
  'Unauthorized entry to restricted and designated areas',
];

const CasesPerMonthFilter = ({ cases, students, getCases }) => {
  const [activeMainFilter, setActiveMainFilter] = useState('All');
  const [reportedViolation, setReportedViolation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [dateOfIncident, setDateOfIncident] = useState('All');
  const [years, setYears] = useState([]);
  const [minorPercentageVar, setMinorPercentageVar] = useState('Percentage');
  const [majorPercentageVar, setMajorPercentageVar] = useState('Percentage');
  const [firstOffensePercentageVar, setFirstOffensePercentageVar] =
    useState('Percentage');
  const [secondOffensePercentageVar, setSecondOffensePercentageVar] =
    useState('Percentage');
  const [thirdOffensePercentageVar, setThirdOffensePercentageVar] =
    useState('Percentage');
  const [fourthOffensePercentageVar, setFourthOffensePercentageVar] =
    useState('Percentage');

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = 0; i <= 4; i++) {
      yearsArray.push(currentYear - i);
    }
    setYears(yearsArray);
  }, []);

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filterCases = (
    cases,
    dateOfIncident,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  ) => {
    return cases.filter((c) => {
      const reportedViolationMatch =
        reportedViolation === 'All' ||
        c?.reportedViolation
          ?.toLowerCase()
          .includes(reportedViolation?.toLowerCase());

      const mainFilterMatch =
        activeMainFilter === 'All' || c?.typeOfViolation === activeMainFilter;

      const statusMatch =
        selectedStatus === 'All' || c?.statusOfCase === selectedStatus;

      const dateOfIncidentMatch =
        dateOfIncident === 'All' ||
        new Date(c.dateOfIncident).getFullYear() ===
          new Date(dateOfIncident).getFullYear();

      return (
        dateOfIncidentMatch &&
        reportedViolationMatch &&
        mainFilterMatch &&
        statusMatch
      );
    });
  };

  const filteredCases = filterCases(
    cases,
    dateOfIncident,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  );

  let combinedFilteredCases = [...filteredCases];

  const { majorCases, minorCases } = cases.reduce(
    (acc, c) => {
      if (c.typeOfViolation === 'Major') {
        acc.majorCases.push(c);
      } else if (c.typeOfViolation === 'Minor') {
        acc.minorCases.push(c);
      }
      return acc;
    },
    { majorCases: [], minorCases: [] }
  );

  const totalPercentage = () => {
    return (
      <>
        <div className="text-[48px] text-[#006bff] font-bold">
          {cases.length}
          <span className="text-[20px]"></span>
        </div>
      </>
    );
  };

  const minorPercentage = () => {
    const fraction = (minorCases?.length || 0) / (cases?.length || 1);
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#FFBF00] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const minorNumber = () => {
    return (
      <>
        <div className="text-[48px] text-[#FFBF00] font-bold">
          {minorCases?.length}
          <span className="text-[20px]"></span>
        </div>
      </>
    );
  };

  const majorPercentage = () => {
    const fraction = (majorCases?.length || 0) / (cases?.length || 1);
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#FF5F1F] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const majorNumber = () => {
    return (
      <>
        <div className="text-[48px] text-[#FF5F1F] font-bold">
          {majorCases?.length}
          <span className="text-[20px]"></span>
        </div>
      </>
    );
  };

  const handleSetMinorPercentageVar = () => {
    if (minorPercentageVar === 'Percentage') setMinorPercentageVar('Number');
    else {
      setMinorPercentageVar('Percentage');
    }
  };

  const handleSetMajorPercentageVar = () => {
    if (majorPercentageVar === 'Percentage') setMajorPercentageVar('Number');
    else {
      setMajorPercentageVar('Percentage');
    }
  };

  const filterCasesByOffense = (offense) =>
    cases.filter((c) => c.offense === offense);

  const firstOffenseCases = filterCasesByOffense('1st');
  const secondOffenseCases = filterCasesByOffense('2nd');
  const thirdOffenseCases = filterCasesByOffense('3rd');
  const fourthOffenseCases = filterCasesByOffense('4th');

  const firstOffensePercentage = () => {
    const fraction = (firstOffenseCases?.length || 0) / (cases?.length || 1);
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#006bff] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const firstOffenseNumber = () => {
    return (
      <>
        <div className="text-[48px] text-[#006bff] font-bold">
          {firstOffenseCases.length}
        </div>
      </>
    );
  };

  const secondOffensePercentage = () => {
    const fraction = (secondOffenseCases?.length || 0) / (cases?.length || 1);
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#FFBF00] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const secondOffenseNumber = () => {
    return (
      <>
        <div className="text-[48px] text-[#FFBF00] font-bold">
          {secondOffenseCases.length}
        </div>
      </>
    );
  };

  const thirdOffensePercentage = () => {
    const fraction = (thirdOffenseCases?.length || 0) / (cases?.length || 1);
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#FF5F1F] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const thirdOffenseNumber = () => {
    return (
      <>
        <div className="text-[48px] text-[#FF5F1F] font-bold">
          {thirdOffenseCases.length}
        </div>
      </>
    );
  };

  const fourthOffensePercentage = () => {
    const fraction = (fourthOffenseCases?.length || 0) / (cases?.length || 1);
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-2 text-[48px] text-[#ff3131] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const fourthOffenseNumber = () => {
    return (
      <>
        <div className="text-[48px] text-[#ff3131] font-bold">
          {fourthOffenseCases.length}
        </div>
      </>
    );
  };

  const togglePercentage = (currentValue, setter) => {
    setter(currentValue === 'Percentage' ? 'Number' : 'Percentage');
  };

  const handleSetFirstOffensePercentageVar = () =>
    togglePercentage(firstOffensePercentageVar, setFirstOffensePercentageVar);
  const handleSetSecondOffensePercentageVar = () =>
    togglePercentage(secondOffensePercentageVar, setSecondOffensePercentageVar);
  const handleSetThirdOffensePercentageVar = () =>
    togglePercentage(thirdOffensePercentageVar, setThirdOffensePercentageVar);
  const handleSetFourthOffensePercentageVar = () =>
    togglePercentage(fourthOffensePercentageVar, setFourthOffensePercentageVar);

  let combinedViolations = [...majorViolation, ...minorViolation];

  return (
    <>
      <div className="w-[100%] flex flex-wrap justify-start items-center gap-x-4 gap-y-4 mt-2">
        <div className="sm:overflow-x-scroll">
          <div className="w-[fit-content] flex justify-start items-start flex-wrap gap-4 whitespace-nowrap">
            <div className="p-2 w-[214px] h-[196px] bg-white border-[1px] border-blue-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden">
              <div className="w-[100%] h-[100%] flex flex-col justify-end items-center gap-6">
                {totalPercentage()}
                <div className="text-[16px] text-[#006bff]">Total Cases</div>
              </div>
              <svg
                className="absolute top-0 left-0"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
              >
                <path
                  d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                  style={{
                    stroke: 'none',
                    fill: 'rgba(219, 234, 254, 1)',
                    strokeWidth: '2px',
                  }}
                ></path>
              </svg>
            </div>
            <div
              onClick={() => handleSetMinorPercentageVar()}
              className="p-2 w-[214px] h-[196px] bg-white border-[1px] border-yellow-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
            >
              <div className="w-[100%] h-[100%] flex flex-col justify-end items-center gap-6">
                {minorPercentageVar === 'Percentage' ? (
                  <>{minorPercentage()}</>
                ) : (
                  <>{minorNumber()}</>
                )}
                <div className="text-[16px] text-[#FFBF00]">Minor Cases</div>
              </div>

              <svg
                className="absolute top-0 left-0"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
              >
                <path
                  d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                  style={{
                    stroke: 'none',
                    fill: 'rgba(254, 249, 195, 1)',
                    strokeWidth: '2px',
                  }}
                ></path>
              </svg>
            </div>
            <div
              onClick={() => handleSetMajorPercentageVar()}
              className="p-2 w-[214px] h-[196px] bg-white border-[1px] border-orange-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
            >
              <div className="w-[100%] h-[100%] flex flex-col justify-end items-center gap-6">
                {majorPercentageVar === 'Percentage' ? (
                  <>{majorPercentage()}</>
                ) : (
                  <>{majorNumber()}</>
                )}
                <div className="text-[16px] text-[#FF5F1F]">Major Cases</div>
              </div>

              <svg
                className="absolute top-0 left-0"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
              >
                <path
                  d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                  style={{
                    stroke: 'none',
                    fill: 'rgba(255, 237, 213, 1)',
                    strokeWidth: '2px',
                  }}
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="sm:overflow-x-scroll">
          <div className="w-[fit-content] flex justify-start items-center flex-wrap gap-4 whitespace-nowrap">
            <div
              onClick={() => handleSetFirstOffensePercentageVar()}
              className="p-2 w-[214px] h-[196px] bg-white border-[1px] border-blue-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
            >
              <div className="w-[100%] h-[100%] flex flex-col justify-end items-center gap-6">
                {firstOffensePercentageVar === 'Percentage' ? (
                  <>{firstOffensePercentage()}</>
                ) : (
                  <>{firstOffenseNumber()}</>
                )}
                <div className="text-[16px] text-[#006bff]">1st Offense</div>
              </div>

              <svg
                className="absolute top-0 left-0"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
              >
                <path
                  d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                  style={{
                    stroke: 'none',
                    fill: 'rgba(219, 234, 254, 1)',
                    strokeWidth: '2px',
                  }}
                ></path>
              </svg>
            </div>

            <div
              onClick={() => handleSetSecondOffensePercentageVar()}
              className="p-2 w-[214px] h-[196px] bg-white border-[1px] border-yellow-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
            >
              <div className="w-[100%] h-[100%] flex flex-col justify-end items-center gap-6">
                {secondOffensePercentageVar === 'Percentage' ? (
                  <>{secondOffensePercentage()}</>
                ) : (
                  <>{secondOffenseNumber()}</>
                )}
                <div className="text-[16px] text-[#FFBF00]">2nd Offense</div>
              </div>

              <svg
                className="absolute top-0 left-0"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
              >
                <path
                  d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                  style={{
                    stroke: 'none',
                    fill: 'rgba(254, 249, 195, 1)',
                    strokeWidth: '2px',
                  }}
                ></path>
              </svg>
            </div>

            <div
              onClick={() => handleSetThirdOffensePercentageVar()}
              className="p-2 w-[214px] h-[196px] bg-white border-[1px] border-orange-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
            >
              <div className="w-[100%] h-[100%] flex flex-col justify-end items-center gap-6">
                {thirdOffensePercentageVar === 'Percentage' ? (
                  <>{thirdOffensePercentage()}</>
                ) : (
                  <>{thirdOffenseNumber()}</>
                )}
                <div className="text-[16px] text-[#FF5F1F]">3rd Offense</div>
              </div>

              <svg
                className="absolute top-0 left-0"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
              >
                <path
                  d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                  style={{
                    stroke: 'none',
                    fill: 'rgba(255, 237, 213, 1)',
                    strokeWidth: '2px',
                  }}
                ></path>
              </svg>
            </div>

            <div
              onClick={() => handleSetFourthOffensePercentageVar()}
              className="p-2 w-[214px] h-[196px] bg-white border-[1px] border-red-200 rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
            >
              <div className="w-[100%] h-[100%] flex flex-col justify-end items-center gap-6">
                {fourthOffensePercentageVar === 'Percentage' ? (
                  <>{fourthOffensePercentage()}</>
                ) : (
                  <>{fourthOffenseNumber()}</>
                )}
                <div className="text-[16px] text-[#ff3131]">4th Offense</div>
              </div>

              <svg
                className="absolute top-0 left-0"
                viewBox="0 0 500 500"
                preserveAspectRatio="xMinYMin meet"
              >
                <path
                  d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                  style={{
                    stroke: 'none',
                    fill: 'rgba(254, 226, 226, 1)',
                    strokeWidth: '2px',
                  }}
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 mt-8">
        <span className="text-[24px] text-[#006bff] font-semibold">
          Monthly Bar Chart
        </span>
      </div>
      <div className="w-100 text-[#404040] flex flex-col border-[1px] border-[1px] border-blue-200 bg-[#f6faff] rounded-[6px]">
        <div className="px-3 w-100 h-[58px] flex justify-between gap-2 bg-[white] rounded-[6px]">
          <div className="flex justify-start items-center gap-2">
            <div
              onClick={() => handleMainFilterChange('All')}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === 'All'
                  ? 'border-b-2 border-blue-600'
                  : 'border-b-2 border-white'
              }`}
            >
              All Cases
            </div>

            <div
              onClick={() => handleMainFilterChange('Minor')}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === 'Minor'
                  ? 'border-b-2 border-blue-600'
                  : 'border-b-2 border-white'
              }`}
            >
              Minor
            </div>
            <div
              onClick={() => handleMainFilterChange('Major')}
              className={`px-3 h-[58px] hover:border-b-2 hover:border-blue-600 flex justify-center items-center text-[18px] ${
                activeMainFilter === 'Major'
                  ? 'border-b-2 border-blue-600'
                  : 'border-b-2 border-white'
              }`}
            >
              Major
            </div>
          </div>
          <div className="flex justify-center items-center pr-2">
            <BsFilter className="text-[28px]" />
          </div>
        </div>

        <div className="w-100 flex justify-start p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 sm:gap-2">
            <div className="sm:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[240px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Violation</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setReportedViolation(e.target.value)}
                className="cursor-pointer px-3 py-2 w-[240px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none border-[1px] border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {activeMainFilter === 'All' ? (
                  <>
                    {combinedViolations
                      ?.sort((a, b) => {
                        const nameA = a.toLowerCase();
                        const nameB = b.toLowerCase();

                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                  </>
                ) : null}
                {activeMainFilter === 'Minor' ? (
                  <>
                    {minorViolation
                      ?.sort((a, b) => {
                        const nameA = a.toLowerCase();
                        const nameB = b.toLowerCase();

                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                  </>
                ) : null}
                {activeMainFilter === 'Major' ? (
                  <>
                    {majorViolation
                      ?.sort((a, b) => {
                        const nameA = a.toLowerCase();
                        const nameB = b.toLowerCase();

                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                  </>
                ) : null}
              </select>
            </div>
            <div className="sm:w-[47.8%] flex flex-col items-start gap-2">
              <div className="w-[240px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Status</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="cursor-pointer px-3 py-2 w-[240px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none border-[1px] border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Investigation">Investigation</option>
                <option value="Evaluation">Evaluation</option>
                <option value="Undertaking">Undertaking</option>
                <option value="Dismissed">Dismissed</option>
                <option value="Categorization">Categorization</option>
                <option value="Show Cause">Show Cause</option>
                <option value="Referral">Referral</option>
                <option value="Hearing">Hearing</option>
                <option value="Decision">Decision</option>
                <option value="Appeal">Appeal</option>
                <option value="Implementation">Implementation</option>
                <option value="Case Solved">Case Solved</option>
              </select>
            </div>

            <div className="sm:w-[50%] flex flex-col items-start gap-2">
              <div className="w-[240px] sm:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Year</div>
                </div>
                <BsChevronBarDown />
              </div>
              <select
                value={dateOfIncident}
                onChange={(e) => {
                  setDateOfIncident(e.target.value);
                }}
                className="cursor-pointer px-3 py-2 w-[240px] sm:w-[100%] rounded-[6px] bg-[#ffffff] appearance-none focus:outline-none border-[1px] border-blue-200 focus:border-blue-300"
              >
                <option value="All">All</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <CasesPerMonthBarChart
        cases={combinedFilteredCases}
        students={students}
        getCases={getCases}
      />
    </>
  );
};

export default CasesPerMonthFilter;
