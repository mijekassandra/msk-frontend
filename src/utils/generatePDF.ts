import jsPDF from "jspdf";
import { YouthProfilingProps } from "../components/pages/AdminFeatures/Profiling/api/profilingApi";
import { formatDate } from "./dateUtil";
import barangays from "../mockData/Barangay.json"

// Helper function to convert an image to base64
function loadImageToBase64(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.crossOrigin = 'Anonymous'; // Avoid CORS issues
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            } else {
                reject('Canvas context not found');
            }
        };
        img.onerror = () => {
            reject('Image load error');
        };
    });
}

async function generatePDF(data: YouthProfilingProps | any) {
    const doc = new jsPDF();

    // format functions
    const matchingBarangay = barangays.Barangays.find((b) => b.barangayName === data.barangay)
    const middleInitial = data.middle_name ? `${data.middle_name.charAt(0)}.` : '';
    const formattedBirthDate = formatDate(data.date_of_birth);


    console.log("data: ", data)
    const skfedlogo = await loadImageToBase64('/src/assets/SKFed.png');
    const barangayLogo = await loadImageToBase64(`/src/assets/${matchingBarangay?.logo.split('/').pop()}`);

    //TODO Adding logos at the top
    doc.addImage(skfedlogo, 'PNG', 15, 15, 30, 30); 
    doc.addImage(barangayLogo, 'PNG', 170, 15, 30, 30);

    //TODO Header text
    doc.setFontSize(12);
    doc.text("Republic of the Philippines", 105, 15, { align: "center" });
    doc.text("Province of Misamis Oriental", 105, 22, { align: "center" });
    doc.text("Municipality of Lagonglong", 105, 29, { align: "center" });
    doc.text("Barangay Gaston", 105, 36, { align: "center" });

    doc.setFontSize(14);
    doc.text("OFFICE OF THE SANGGUNIANG KABATAAN", 105, 50, {
        align: "center",
    });
    doc.setFontSize(12);
    doc.text("KK PROFILING", 105, 60, { align: "center" });

    //TODO Draw a line under the header
    doc.line(20, 65, 190, 65);

    //TODO Section title
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Personal Information", 15, 75);

    //TODO Personal Information Fields
    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");
    doc.text("Name: ", 15, 85);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.last_name}, ${data.first_name} ${middleInitial}`, 40, 85);

    doc.setFont("helvetica", "normal");
    doc.text("Age: ", 15, 91);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.age} yrs. old`, 40, 91);

    doc.setFont("helvetica", "normal");
    doc.text("Civil Status: ", 15, 97);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.civil_status}`, 40, 97);

    doc.setFont("helvetica", "normal");
    doc.text("Birthdate: ", 15, 103);
    doc.setFont("helvetica", "bold");
    doc.text(formattedBirthDate, 40, 103);

    doc.setFont("helvetica", "normal");
    doc.text("Gender: ", 15, 109);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.gender}`, 40, 109);

    doc.setFont("helvetica", "normal");
    doc.text("Religion: ", 15, 114);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.religion}`, 40, 114);

    doc.setFont("helvetica", "normal");
    doc.text("Contact No.: ", 15, 121);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.contact_number}` || "", 40, 121);

    doc.setFont("helvetica", "normal");
    doc.text("Registered Voter: ", 15, 127);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.voter_status}`, 47, 127);

    doc.setFont("helvetica", "normal");
    doc.text("Email Address: ", 15, 133);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.email}`, 43, 133);

    doc.setFont("helvetica", "normal");
    doc.text("Address: ", 15, 139);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.address}`, 32, 139);

    doc.setFont("helvetica", "normal");
    doc.text("Highest Educational Attainment: ", 15, 145);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.educational_attainment}`, 72, 145);

    doc.setFont("helvetica", "normal");
    doc.text("If out of school, please indicate the reason: ", 15, 151);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.educational_reason || "N/A"}`, 90, 151);

    doc.setFont("helvetica", "normal");
    doc.text("If working: ", 15, 157);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.occupation || "N/A"}`, 35, 157);

    doc.setFont("helvetica", "normal");
    doc.text("If government, what agency? ", 15, 163);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.agency || "N/A"}`, 66, 163);

    // Section title for Other Information
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Other Information", 15, 176);

    // Other Information Fields
    doc.setFontSize(11);

    doc.setFont("helvetica", "normal");
    doc.text("Do you have disabilities? ", 15, 186);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.disability || "N/A"}`, 60, 186);

    doc.setFont("helvetica", "normal");
    doc.text("Do you have medical conditions? ", 15, 192);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.medical_condition || "N/A"}`, 75, 192);

    doc.setFont("helvetica", "normal");
    doc.text("Are you a member of any youth organization? ", 15, 198);
    doc.setFont("helvetica", "bold");
    doc.text(data.youth_organization ? "yes" : "no", 95, 198);

    doc.setFont("helvetica", "normal");
    doc.text("If YES, please specify what organization: ", 15, 204);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.youth_organization || "N/A"}`, 88, 204);

    doc.setFont("helvetica", "normal");
    doc.text("Skills: ", 15, 210);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.skills || ""}`, 30, 210);

    doc.setFont("helvetica", "normal");
    doc.text("Interests: ", 15, 216);
    doc.setFont("helvetica", "bold");
    doc.text(`${data.interest || ""}`, 34, 216);


    // Generate the PDF as a Blob and open in a new tab
    const pdfBlob = doc.output("blob");
    const blobURL = URL.createObjectURL(pdfBlob);

    // const pdfFileName = `${data.last_name}_${data.first_name}_Profile.pdf`;

    // // Save the PDF with the custom filename
    // doc.save(pdfFileName);

    // Open in a new tab
    window.open(blobURL, '_blank');
}

export default generatePDF;