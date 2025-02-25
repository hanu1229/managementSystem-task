

console.log("doctor.js open");
createHeader(3);

let showTable = (num) => {
    console.log(num);
    if(num == 1) {
        let registerTable = document.querySelector("#register-table");
        if(registerTable.style.display == "none") {
            registerTable.style.display = "block";
        } else if(registerTable.style.display == "block") {
            registerTable.style.display = "none";
        }
    } else if(num == 2) {
        let updateTable = document.querySelector("#update-table");
        if(updateTable.style.display == "none") {
            updateTable.style.display = "block";
        } else if(updateTable.style.display == "block") {
            updateTable.style.display = "none";
        }
    } else if(num == 3) {
        let cancelTable = document.querySelector("#cancel-table");
        if(cancelTable.style.display == "none") {
            cancelTable.style.display = "block";
        } else if(cancelTable.style.display == "block") {
            cancelTable.style.display = "none";
        }
    }

}

/** 환자 정보 전체 출력 */
let _printAll = async () => {
    let tbody = document.querySelector("#doctor-table > tbody");
    let selectIn = document.querySelector("#dselect");
    let html = ``;
    let select = `<option value="0">전체</option>`;
    try {
        let response =  await axios.get("/doctor");
        console.log(response.data);
        response.data.forEach(doctor => {
            html += `
            <tr>
                <td>${doctor.doctorid}</td>
                <td>${doctor.name}</td>
                <td>${doctor.specialty}</td>
                <td>${doctor.phone}</td>
                <td>${doctor.createdat}</td>
                <td>
                    <button type="button" onclick="_update(${doctor.doctorid}, '${doctor.name}', '${doctor.phone}', '${doctor.specialty}')">수정</button>
                    <button type="button" onclick="_delete(${doctor.doctorid}, '${doctor.name}')">삭제</button>
                </td>
            </tr>
            `;
            select += `
            <option value="${doctor.doctorid}">${doctor.doctorid}</option>
            `;
        });
        tbody.innerHTML = html;
        selectIn.innerHTML = select;
    } catch(e) {
        console.log(e);
    }
}
_printAll();

/** 환자 정보 개별 출력 */
let _print = async () => {

    let select = document.querySelector("#dselect");
    let tbody = document.querySelector("#doctor-table > tbody");
    let html = ``;
    try {
        if(select.value == 0) {
            _printAll();
        } else {
            let response = await axios.get(`/doctor/detail?doctorid=${select.value}`);
            if(response.data != null) {
                let doctor = response.data;
                html += `
                <tr>
                    <td>${doctor.doctorid}</td>
                    <td>${doctor.name}</td>
                    <td>${doctor.specialty}</td>
                    <td>${doctor.phone}</td>
                    <td>${doctor.createdat}</td>
                    <td>
                        <button type="button" onclick="_update(${doctor.doctorid}, '${doctor.name}', '${doctor.phone}', '${doctor.specialty}')">수정</button>
                        <button type="button" onclick="_delete(${doctor.doctorid}, '${doctor.name}')">삭제</button>
                    </td>
                </tr>
                `;
                tbody.innerHTML = html;
            }
        }
    } catch(e) {
        console.log(e);
    }
}

/** 환자 정보 등록 */
let _register = async () => {
    let name = document.querySelector("#name-register");
    let specialty = document.querySelector("#specialty-register");
    let phone = document.querySelector("#phone-register");
    try {
        let state = confirm(`이름 : ${name.value}\n전공 분야 : ${specialty.value}\n전화번호 : ${phone.value}\n정말 등록하시겠습니까?`);
        if(state) {
            let obj = {name : name.value, specialty : specialty.value, phone : phone.value};
            let response = await axios.post(`/doctor`, obj);
            if(response.data == true) {
                alert("등록을 성공했습니다.");
                _printAll();
            } else {
                alert("등록을 실패했습니다.");
            }
        }
    } catch(e) {
        console.log(e);
    }
}

/** 환자 정보 수정 */
let _update = async (doctorid, name, phone, specialty) => {
    let state = confirm("정말 수정하시겠습니까?");
    if(state) {
        let newName = prompt(`이름을 입력해주세요 : ${name}`, `${name}`);
        let newPhone = prompt(`전화번호를 입력해주세요 : ${phone}`, `${phone}`);
        let newSpecialty = prompt(`주소를 입력해주세요 : ${specialty}`, `${specialty}`);
        let obj = {doctorid : doctorid, name : newName, phone : newPhone, specialty : newSpecialty};
        try {
            let response = await axios.put(`/doctor`, obj);
            if(response.data == true) {
                alert("수정되었습니다.");
                _printAll();
            } else {
                alert("수정실패했습니다.");
            }
        } catch(e) {
            console.log(e);
        }
    }
}

/** 환자 정보 삭제 */
let _delete = async (doctorid, name) => {

    let state = confirm(`정말로 ${name}님을 삭제하시겠습니까?`);
    if(state) {
        try {
            let response = await axios.delete(`/doctor?doctorid=${doctorid}`);
            if(response.data == true) {
                alert(`${name}님이 삭제되었습니다.`);
                _printAll();
            } else {
                alert("삭제를 실패했습니다.");
            }
        } catch(e) {
            console.log(e);
        }
    }
}