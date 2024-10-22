let file_image_ref = new FormData()

const convertToTestTaking = (key) => {
    if (key === "primary_test") {
        return "ประถมศึกษา (8.30 - 10.30 น.)"
    } else if (key === "m1_test") {
        return "มัธยมศึกษาปีที่ 1 (10.30 - 12.00 น.)"
    } else if (key === "m2_test") {
        return "มัธยมศึกษาปีที่ 2 (13.00 - 14.30 น.)"
    } else if (key === "m3_test") {
        return "มัธยมศึกษาปีที่ 3 (8.30 - 10.30 น.)"
    } else if (key === "m4_test") {
        return "มัธยมศึกษาปีที่ 4 (10.30 - 12.00 น.)"
    } else if (key === "m5_test") {
        return "มัธยมศึกษาปีที่ 5 (13.00 - 14.30 น.)"
    }
};

const prefix = localStorage.getItem("prefix");
const firstname = localStorage.getItem("firstname");
const lastname = localStorage.getItem("lastname");
const class_no = localStorage.getItem("class_no");
const school_name = localStorage.getItem("school_name");
const city = localStorage.getItem("city");
const phone_number = localStorage.getItem("phone_number")
const email = localStorage.getItem("email");
const total_fee = localStorage.getItem("total_fee");
const test_taking = JSON.parse(localStorage.getItem("test_taking"));


let full_name = document.querySelector("#user-detail-full-name")
full_name.innerHTML = `<b>ชื่อ:</b> ${prefix || "-"} ${firstname} ${lastname}`;

let school_data = document.querySelector("#user-detail-school-data");
school_data.innerHTML = `<b>ชั้น:</b> ${class_no || "-"} &nbsp;&nbsp;<b>โรงเรียน:</b> ${school_name || "-"}`;

let city_data = document.querySelector("#user-detail-city");
city_data.innerHTML = `<b>จังหวัด:</b> ${city || "-"}`;

let phone_data = document.querySelector("#user-detail-phone");
phone_data.innerHTML = `<b>เบอร์มือถือ:</b> ${phone_number || "-"}`;

let email_data = document.querySelector("#user-detail-email");
email_data.innerHTML = `<b>อีเมล:</b> ${email || "-"}`;

let total_fee_data = document.querySelector("#pay-detail-total-fee");
total_fee_data.innerHTML = `<b>ค่าสมัครรวม:</b> ${total_fee || "0"} บาท`;

let testTakings = `<b>รายการสมัครสอบ:</b><br>`;
for (let i=0; i<test_taking.length; i++) {
    testTakings = testTakings + `<div style="margin-left: 0.5rem;">${i+1}.${convertToTestTaking(test_taking[i])}</div>`;
}

let test_taking_data = document.querySelector("#pay-detail-test-taking");
test_taking_data.innerHTML = testTakings;

document.getElementById('receipt_file').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file
    file_image_ref.append("file", file);
    const preview = document.getElementById('imagePreview'); // Get the preview element
    
    if (file) {
        const reader = new FileReader(); // Create a FileReader object
        
        reader.onload = function(e) {
            preview.src = e.target.result; // Set the src of the preview image
            preview.style.display = 'block'; // Show the preview image
        }
        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        preview.style.display = 'none'; // Hide the preview if no file is selected
    }
});

document.getElementById('form-data').addEventListener('submit', function(event) {
    event.preventDefault();
    const form_data = {
        prefix, 
        firstname,
        lastname,
        class_no,
        school_name, 
        city,
        phone_number,
        email,
        total_fee,
        test_list: test_taking,
    };
    file_image_ref.append('user_data', JSON.stringify(form_data));

    handleOnSent(file_image_ref)
    .then((res) => {
        if (res.success) {
            window.location.href = "index.html"
        }
    })
    localStorage.setItem("prefix", '')
    localStorage.setItem("firstname", '')
    localStorage.setItem("lastname", '')
    localStorage.setItem("class_no", '')
    localStorage.setItem("school_name", '')
    localStorage.setItem("city", '')
    localStorage.setItem("phone_number", '')
    localStorage.setItem("email", '')
    localStorage.setItem("total_fee", '')
    localStorage.setItem("test_taking", '')

    const toastLiveExample = document.getElementById('liveToast')
});

// const handleOnSubmit = (event) => {
//     event.preventDefault();
//     const form_data = {
//         prefix, 
//         firstname,
//         lastname,
//         class_no,
//         school_name, 
//         city,
//         phone_number,
//         email,
//         total_fee,
//         test_list: test_taking,
//     };
//     file_image_ref.append('user_data', JSON.stringify(form_data));

//     handleOnSent(file_image_ref)
//     .then((res) => {
//         if (res.success) {
//             window.location.href = "index.html"
//         }
//     })
//     localStorage.setItem("prefix", '')
//     localStorage.setItem("firstname", '')
//     localStorage.setItem("lastname", '')
//     localStorage.setItem("class_no", '')
//     localStorage.setItem("school_name", '')
//     localStorage.setItem("city", '')
//     localStorage.setItem("phone_number", '')
//     localStorage.setItem("email", '')
//     localStorage.setItem("total_fee", '')
//     localStorage.setItem("test_taking", '')

//     const toastLiveExample = document.getElementById('liveToast')
//     const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
// };

const handleOnSent = async (formData) => {
    try {
        const response = await fetch('https://back-table-api.shorttermmemorykku.com/transaction_user', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        return result
    } catch (error) {
        console.error('Error:', error);
    }
};