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

const formHandle = (event) => {
    event.preventDefault();

    const firstname = event.target.elements["firstname-check"].value;
    const lastname = event.target.elements["lastname-check"].value;
    const year = event.target.elements["year-check"].value;
    const phone_number = event.target.elements["phone_number-check"].value;

    const checkData = {
        firstname,
        lastname,
        year,
        phone_number
    };

    handleOnSent(checkData)
    .then((res) => {
        if (res.success) {
            const userData = res.response.data[0];
            let full_name = document.querySelector("#user-detail-full-name")
            full_name.innerHTML = `<b>ชื่อ:</b> ${userData.prefix || "-"} ${userData.firstname} ${userData.lastname}`;

            let school_data = document.querySelector("#user-detail-school-data");
            school_data.innerHTML = `<b>ชั้น:</b> ${userData.class_no || "-"} &nbsp;&nbsp;<b>โรงเรียน:</b> ${userData.transaction.school_name || "-"}`;
            
            let city_data = document.querySelector("#user-detail-city");
            city_data.innerHTML = `<b>จังหวัด:</b> ${userData.transaction.city || "-"}`;

            let phone_data = document.querySelector("#user-detail-phone");
            phone_data.innerHTML = `<b>เบอร์มือถือ:</b> ${userData.phone_number || "-"}`;

            let email_data = document.querySelector("#user-detail-email");
            email_data.innerHTML = `<b>อีเมล:</b> ${userData.email || "-"}`;

            let testTakings = `<b>รายการสมัครสอบ:</b><br>`;
            for (let i=0; i<userData.test_list.length; i++) {
                testTakings = testTakings + `<div style="margin-left: 0.5rem;">${i+1}.${convertToTestTaking(userData.test_list[i])}</div>`;
            }
            let test_taking_data = document.querySelector("#pay-detail-test-taking");
            test_taking_data.innerHTML = testTakings;

            let is_verify = document.querySelector("#is_verify_status");
            is_verify.innerHTML = `<b>สถานะการสมัคร:</b> ${userData.transaction.is_verify || "ยังไม่ตรวจสอบสถานะ"}`;
        }
    })
};

const handleOnSent = async (data) => {
    try {
        const response = await fetch('https://back-table-api.shorttermmemorykku.com/test_taking_user/all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        return result
    } catch (error) {
        console.error('Error:', error);
    }
};