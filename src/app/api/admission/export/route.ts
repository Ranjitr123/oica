import { NextResponse } from "next/server";
import { getExcelBuffer } from "@/lib/excelStore";

export async function GET() {
  try {
    const excelBuffer = getExcelBuffer();

    return new Response(new Uint8Array(excelBuffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          'attachment; filename="OICA_Admission_Submissions.xlsx"',
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Error exporting Excel sheet:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate Excel download." },
      { status: 500 }
    );
  }
}
