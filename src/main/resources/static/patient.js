


console.log("patient.js open");
createHeader(2);

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
    let tbody = document.querySelector("#patient-table > tbody");
    let selectIn = document.querySelector("#pselect");
    let html = ``;
    let select = ``;
    try {
        let response =  await axios.get("/patient");
        console.log(response.data);
        response.data.forEach(patient => {
            html += `
            <tr>
                <td>${patient.patientid}</td>
                <td>${patient.name}</td>
                <td>${patient.birthdate}</td>
                <td>${patient.phone}</td>
                <td>${patient.address}</td>
                <td>${patient.createdat}</td>
                <td>
                    <button type="button" onclick="_update(${patient.patientid}, '${patient.name}', '${patient.phone}', '${patient.address}')">수정</button>
                    <button type="button" onclick="_delete(${patient.patientid}, '${patient.name}')">삭제</button>
                </td>
            </tr>
            `;
            select += `
            <option value="${patient.patientid}">${patient.patientid}</option>
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

    let select = document.querySelector("#pselect");
    let tbody = document.querySelector("#patient-table > tbody");
    let html = ``;
    try {
        let response = await axios.get(`/patient/detail?patientid=${select.value}`);
        if(response.data != null) {
            let patient = response.data;
            html += `
            <tr>
                <td>${patient.patientid}</td>
                <td>${patient.name}</td>
                <td>${patient.birthdate}</td>
                <td>${patient.phone}</td>
                <td>${patient.address}</td>
                <td>${patient.createdat}</td>
                <td>
                    <button type="button" onclick="_update(${patient.patientid}, '${patient.name}', '${patient.phone}', '${patient.address}')">수정</button>
                    <button type="button" onclick="_delete(${patient.patientid}, '${patient.name}')">삭제</button>
                </td>
            </tr>
            `;
            tbody.innerHTML = html;
        }
    } catch(e) {
        console.log(e);
    }
}

/** 환자 정보 등록 */
let _register = async () => {
    let name = document.querySelector("#name-register");
    let birthdate = document.querySelector("#birthdate-register");
    let phone = document.querySelector("#phone-register");
    let address = document.querySelector("#address-register");
    try {
        let state = confirm(`이름 : ${name.value}\n생년월일 : ${birthdate.value}\n전화번호 : ${phone.value}\n주소 : ${address.value}\n정말 등록하시겠습니까?`);
        if(state) {
            let obj = {name : name.value, birthdate : birthdate.value, phone : phone.value, address : address.value};
            let response = await axios.post(`/patient`, obj);
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
let _update = async (patientid, name, phone, address) => {
    let state = confirm("정말 수정하시겠습니까?");
    if(state) {
        let newName = prompt(`이름을 입력해주세요 : ${name}`, `${name}`);
        let newPhone = prompt(`전화번호를 입력해주세요 : ${phone}`, `${phone}`);
        let newAddress = prompt(`주소를 입력해주세요 : ${address}`, `${address}`);
        let obj = {patientid : patientid, name : newName, phone : newPhone, address : newAddress};
        try {
            let response = await axios.put(`/patient`, obj);
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
let _delete = async (patientid, name) => {

    let state = confirm(`정말로 ${name}님을 삭제하시겠습니까?`);
    if(state) {
        try {
            let response = await axios.delete(`/patient?patientid=${patientid}`);
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