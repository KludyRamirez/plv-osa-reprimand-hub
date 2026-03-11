import * as XLSX from "xlsx";

export default function xlsxStudentsExporter(selectedIds, students, cases) {
  const exportStudents =
    selectedIds.length > 0
      ? students.filter((s) => selectedIds.includes(s._id))
      : students;

  const rows = exportStudents.map((s) => {
    const casesCount = cases?.filter(
      (c) => c?.student?._id === s._id
    ).length;

    return {
      "Student No": s.studentNo || "",
      "Last Name": s.surName || "",
      "First Name": s.firstName || "",
      "Middle Name": s.middleName || "",
      College: s.college || "",
      Department: s.department || "",
      Year: s.year || "",
      Section: s.section || "",
      Sex: s.sex || "",
      "Contact No": s.contactNo || "",
      "Guardian Contact No": s.guardianContactNo || "",
      Email: s.email || "",
      Status: s.statusOfStudent || "",
      "No. of Cases": casesCount,
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);

  const colWidths = Object.keys(rows[0] || {}).map((key) => {
    const maxLen = Math.max(
      key.length,
      ...rows.map((r) => String(r[key] || "").length)
    );
    return { wch: Math.min(maxLen + 2, 50) };
  });
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  XLSX.writeFile(workbook, "students_export.xlsx");
}
