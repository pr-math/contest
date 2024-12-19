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

const convertToTestTakingNoTime = (key) => {
    if (key === "primary_test") {
        return "ประถมศึกษา"
    } else if (key === "m1_test") {
        return "มัธยมศึกษาปีที่ 1"
    } else if (key === "m2_test") {
        return "มัธยมศึกษาปีที่ 2"
    } else if (key === "m3_test") {
        return "มัธยมศึกษาปีที่ 3"
    } else if (key === "m4_test") {
        return "มัธยมศึกษาปีที่ 4"
    } else if (key === "m5_test") {
        return "มัธยมศึกษาปีที่ 5"
    }
};

const formHandle = (event) => {
    event.preventDefault();

    const firstname = event.target.elements["firstname-check"].value;
    const lastname = event.target.elements["lastname-check"].value;
    const year = event.target.elements["year-check"].value;
    // const phone_number = event.target.elements["phone_number-check"].value;

    const checkData = {
        firstname,
        lastname,
        year,
        // phone_number
    };

    handleOnSent(checkData)
    .then((res) => {
        if (res.success && res.response.data.length === 1) {
            const userData = res.response.data[0];

            let testTakings = `<b>รายการสมัครสอบ:</b><br>`;
            for (let i=0; i<userData.test_list.length; i++) {
                testTakings = testTakings + `<div style="margin-left: 0.5rem;">${i+1}.${convertToTestTaking(userData.test_list[i])}</div>`;
            };

            let scoreLists = userData.score_list === null 
                ?   `
                    <div class="form-floating col" style="padding: 2rem; border-radius: 4px; text-align: center;">
                        <h2 style="font-size: 1rem; font-weight: 400;">ไม่มีข้อมูล</h2>
                    </div>
                    `
                : '';

            for (let i=0; i<userData?.score_list?.length; i++) {
                scoreLists = scoreLists + `
                    <div class="row" style="margin-top: 0.25rem;">
                        <div style="margin-left: 0.5rem;"><b>${i+1}. รายการ: ${convertToTestTakingNoTime(userData.test_list[i])}</b></div>
                        <div style="margin-left: 0.5rem;">ปรนัย: ${userData?.score_list[i][0] || '-'} คะแนน</div>
                        <div style="margin-left: 0.5rem;">อัตนัย: ${userData?.score_list[i][1] || '-'} คะแนน</div>
                        <div style="margin-left: 0.5rem;">คะแนนรวม: ${Number(userData?.score_list[i][0]) + Number(userData?.score_list[i][1]) } คะแนน</div>
                        <div style="margin-left: 0.5rem;">อันดับที่: ${userData?.no[i] || '-'}</div>
                            <div>
                                <label style="margin-left: 0.5rem;"><b>เกียติบัตร:</b></label>
                                <a href=${userData?.certificate_ref[i] || "#"} target=${userData?.certificate_ref[i] ? "_blank" : ""}>
                                    <button type="button" class="btn" style="background-color: #C08B5C; color: white; width: 7rem;">ดาวน์โหลด</button>
                                </a>
                            </div>
                        </div>
                `;
            };

            let search_result = document.querySelector("#search-result");
            search_result.innerHTML = `
                <label class="form-label" style="margin-left: 2rem; text-decoration: underline;">รายละเอียดการสมัคร</label>
                <div style="border: 1px solid #ced4da; padding: 1rem; border-radius: 4px;">
                    <div class="row">
                        <label id="user-detail-full-name"><b>ชื่อ:</b> ${userData?.prefix || "-"} ${userData?.firstname || ''} ${userData?.lastname || ''}</label>
                    </div>
                    <div class="row" style="margin-top: 0.25rem;">
                        <label id="user-detail-school-data"><b>ชั้น:</b> ${userData?.class_no || "-"}</label>
                    </div>
                    <div class="row" style="margin-top: 0.25rem;">
                        <label id="user-detail-school-data"><b>โรงเรียน:</b> ${userData?.transaction?.school_name || "-"}</label>
                    </div>
                    <div class="row" style="margin-top: 0.25rem;">
                        <label id="user-detail-city"><b>จังหวัด:</b> ${userData?.transaction?.city || "-"}</label>
                    </div>
                    <div class="row" style="margin-top: 0.25rem;">
                        <label id="pay-detail-test-taking">${testTakings}</label>
                    </div>
                    <div class="row" style="margin-top: 0.25rem;">
                        <label id="is_verify_status"><b>สถานะการสมัคร:</b> ${userData?.transaction.isVerify ? "ตรวจสอบสถานะสำเร็จ" : "ยังไม่ตรวจสอบสถานะ"}</label>
                    </div>
                </div>
                <label class="form-label" style="margin-left: 2rem; margin-top: 0.75rem; text-decoration: underline;">ผลการสอบ</label>
                <div style="border: 1px solid #ced4da; padding: 0.5rem; border-radius: 4px;">${scoreLists}</div>
            `;
        };

        if (res.success && res.response.data.length === 0) {
            let search_result = document.querySelector("#search-result");
            search_result.innerHTML = `
                <div class="form-floating col" style="border: 1px solid #ced4da; padding: 3rem; border-radius: 4px; text-align: center;">
                    <h2 style="font-size: 1rem; font-weight: 400;">ไม่พบข้อมูล</h2>
                </div>
            `;
        }

        if (!res.success) {
            let search_result = document.querySelector("#search-result");
            search_result.innerHTML = `
                <div class="form-floating col" style="border: 1px solid #ced4da; padding: 3rem; border-radius: 4px; text-align: center;">
                    <h2 style="font-size: 1rem; font-weight: 400;">มีบางอย่างผิดพลาด</h2>
                </div>
            `;
        }
    })
    .catch((err) => {
        console.log(err);
        let search_result = document.querySelector("#search-result");
        search_result.innerHTML = `
            <div class="form-floating col" style="border: 1px solid #ced4da; padding: 3rem; border-radius: 4px; text-align: center;">
                <h2 style="font-size: 1rem; font-weight: 400;">มีบางอย่างผิดพลาด</h2>
            </div>
        `;
    })
};

const handleOnSent = async (data) => {
    try {
        const response = await fetch('https://back-table-api.shorttermmemorykku.com/test_taking_user', {
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

const handleOnDownLoad = (event, cer_url) => {
    event.preventDefault();
    window.open(cer_url, "_blank");
};