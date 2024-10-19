const formHandle = (event) => {
    event.preventDefault();
    let total_fee = 0;
    let test_taking = [];
    const prefix = event.target.elements["prefix"].value;
    const firstname = event.target.elements["firstname"].value;
    const lastname = event.target.elements["lastname"].value;
    const class_no = event.target.elements["class_no"].value;
    const school_name = event.target.elements["school_name"].value;
    const city = event.target.elements["city"].value;
    const phone_number = event.target.elements["phone_number"].value;
    const email = event.target.elements["email"].value;
    const primary_test = event.target.elements["primary_test"];
    const m1_test = event.target.elements["m1_test"];
    const m2_test = event.target.elements["m2_test"];
    const m3_test = event.target.elements["m3_test"];
    const m4_test = event.target.elements["m4_test"];
    const m5_test = event.target.elements["m5_test"];

    console.log(primary_test.checked)
    if (!primary_test.checked && !m1_test.checked && !m2_test.checked && !m3_test.checked && !m4_test.checked && !m5_test.checked) {
        let test_type_warning = document.getElementById("test-type-warning");
        const warning = `กรุณาเลือก "รายการสมัครสอบ"`;
        test_type_warning.innerHTML = warning;
    } else {
        document.location.href = "pay-sign-up-person.html"
    };

    if (primary_test.checked) {
        total_fee = total_fee + 50;
        test_taking = [ ...test_taking , "primary_test"];
    };

    if (m1_test.checked) {
        total_fee = total_fee + 50;
        test_taking = [ ...test_taking , "m1_test"];
    };

    if (m2_test.checked) {
        total_fee = total_fee + 50;
        test_taking = [ ...test_taking , "m2_test"];
    };

    if (m3_test.checked) {
        total_fee = total_fee + 50;
        test_taking = [ ...test_taking , "m3_test"];
    };

    if (m4_test.checked) {
        total_fee = total_fee + 50;
        test_taking = [ ...test_taking , "m4_test"];
    };

    if (m5_test.checked) {
        total_fee = total_fee + 50;
        test_taking = [ ...test_taking , "m5_test"];
    };

    const formData = {
        prefix,
        firstname,
        lastname,
        class_no,
        school_name,
        city,
        phone_number,
        email,
        total_fee,
        test_taking
    };
    console.log(formData);

    localStorage.setItem("prefix", prefix)
    localStorage.setItem("firstname", firstname)
    localStorage.setItem("lastname", lastname)
    localStorage.setItem("class_no", class_no)
    localStorage.setItem("school_name", school_name)
    localStorage.setItem("city", city)
    localStorage.setItem("phone_number", phone_number)
    localStorage.setItem("email", email)
    localStorage.setItem("total_fee", total_fee)
    localStorage.setItem("test_taking", JSON.stringify(test_taking))
};

const onChangClassNo = (event) => {
    event.preventDefault();
    const primary_test = document.querySelector("#primary_test");
    const m1_test = document.querySelector("#m1_test");
    const m2_test = document.querySelector("#m2_test");
    const m3_test = document.querySelector("#m3_test");
    const m4_test = document.querySelector("#m4_test");
    const m5_test = document.querySelector("#m5_test");
    const class_no = event.target.value;

    if (class_no === "ม.1") {
        primary_test.disabled = true;
        m1_test.disabled = false;
        m2_test.disabled = false;
        m3_test.disabled = false;
        m4_test.disabled = false;
        m5_test.disabled = false;
    } else if (class_no === "ม.2") {
        primary_test.disabled = true;
        m1_test.disabled = true;
        m2_test.disabled = false;
        m3_test.disabled = false;
        m4_test.disabled = false;
        m5_test.disabled = false;
    } else if (class_no === "ม.3") {
        primary_test.disabled = true;
        m1_test.disabled = true;
        m2_test.disabled = true;
        m3_test.disabled = false;
        m4_test.disabled = false;
        m5_test.disabled = false;
    } else if (class_no === "ม.4") {
        primary_test.disabled = true;
        m1_test.disabled = true;
        m2_test.disabled = true;
        m3_test.disabled = true;
        m4_test.disabled = false;
        m5_test.disabled = false;
    } else if (class_no === "ม.5") {
        primary_test.disabled = true;
        m1_test.disabled = true;
        m2_test.disabled = true;
        m3_test.disabled = true;
        m4_test.disabled = true;
        m5_test.disabled = false;
    } else {
        primary_test.disabled = false;
        m1_test.disabled = false;
        m2_test.disabled = false;
        m3_test.disabled = false;
        m4_test.disabled = false;
        m5_test.disabled = false;
    }
};