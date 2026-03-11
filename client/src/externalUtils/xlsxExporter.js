import * as XLSX from "xlsx";

export default function xlsxExporter(selectedIds, cases) {
  const exportCases =
    selectedIds.length > 0
      ? cases.filter((c) => selectedIds.includes(c._id))
      : cases;

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const rows = exportCases.map((c) => ({
    "Case No": c.caseNo,
    Offense: c.offense,
    "Student No": c.student?.studentNo || "",
    Name: `${c.student?.firstName || ""} ${c.student?.surName || ""}`.trim(),
    College: c.student?.college || "",
    Department: c.student?.department || "",
    Year: c.year || "",
    Section: c.student?.section || "",
    "Type of Violation": c.typeOfViolation || "",
    "Reported Violation": c.reportedViolation || "",
    "Date of Incident": formatDate(c.dateOfIncident),
    "Date Reported": formatDate(c.dateReported),
    "Case Status": c.statusOfCase || "",
    Remarks: c.remarks || "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-size columns
  const colWidths = Object.keys(rows[0] || {}).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...rows.map((r) => String(r[key] || "").length)
    );
    return { wch: Math.min(maxLen + 2, 50) };
  });
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Cases");
  XLSX.writeFile(workbook, "cases_export.xlsx");
}
