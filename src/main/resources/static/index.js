

console.log("index.js");
createHeader(1);

/** 진료 예약 등록 페이지 보이게 하기 */
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
    let tbody = document.querySelector("#appointment-table > table > tbody");
    let pselectIn = document.querySelector("#pselect");
    let dselectIn = document.querySelector("#dselect");
    let html = ``;
    let pselect = `<option value="0">전체</option>`;
    let dselect = `<option value="0">전체</option>`;
    let count = 0;
    try {
        let response =  await axios.get("/appointment");
        console.log(response.data);
        response.data.forEach(appointment => {
            html += `
            <tr>
                <td>${appointment.appointmentid}</td>
                <td>${appointment.patientid}</td>
                <td>${appointment.doctorid}</td>
                <td>${appointment.appointmentdate}</td>
                <td>${appointment.appointmenttime}</td>
                <td>${appointment.status}</td>
                <td>${appointment.createdat}</td>
                <td>
                    <button type="button" onclick="_update(${appointment.appointmentid}, '${appointment.name}', '${appointment.phone}', '${appointment.specialty}')">수정</button>
                    <button type="button" onclick="_delete(${appointment.appointmentid}, '${appointment.name}')">삭제</button>
                </td>
            </tr>
            `;
            pselect += `
            <option value="${appointment.patientid}">${appointment.patientid}</option>
            `;
            if(count < 5) {
                dselect += `
                <option value="${appointment.doctorid}">${appointment.doctorid}</option>
                `;
                count++;
            }

        });
        tbody.innerHTML = html;
        pselectIn.innerHTML = pselect;
        dselectIn.innerHTML = dselect;
    } catch(e) {
        console.log(e);
    }
}
_printAll();

/** 환자 정보 개별 출력 */
let _print = async () => {

    let select = document.querySelector("#aselect");
    let tbody = document.querySelector("#appointment-table > tbody");
    let html = ``;
    try {
        if(select.value == 0) {
            _printAll();
        } else {
            let response = await axios.get(`/doctor/detail?doctorid=${select.value}`);
            if(response.data != null) {
                let appointment = response.data;
                html += `
                <tr>
                    <td>${appointment.appointmentid}</td>
                    <td>${appointment.name}</td>
                    <td>${appointment.specialty}</td>
                    <td>${appointment.phone}</td>
                    <td>${appointment.createdat}</td>
                    <td>
                        <button type="button" onclick="_update(${appointment.appointmentid}, '${appointment.name}', '${appointment.phone}', '${appointment.specialty}')">수정</button>
                        <button type="button" onclick="_delete(${appointment.appointmentid}, '${appointment.name}')">삭제</button>
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

/** 진료 예약 등록 */
let _register = async () => {
    let name = document.querySelector("#name-register");
    let specialty = document.querySelector("#specialty-register");
    let phone = document.querySelector("#phone-register");
    try {
        let state = confirm(`이름 : ${name.value}\n전공 분야 : ${specialty.value}\n전화번호 : ${phone.value}\n정말 등록하시겠습니까?`);
        if(state) {
            let obj = {name : name.value, specialty : specialty.value, phone : phone.value};
            let response = await axios.post(`/appointment`, obj);
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

/** 진료 예약 수정 */
let _update = async (doctorid, name, phone, specialty) => {
    let state = confirm("정말 수정하시겠습니까?");
    if(state) {
        let newName = prompt(`이름을 입력해주세요 : ${name}`, `${name}`);
        let newPhone = prompt(`전화번호를 입력해주세요 : ${phone}`, `${phone}`);
        let newSpecialty = prompt(`주소를 입력해주세요 : ${specialty}`, `${specialty}`);
        let obj = {doctorid : doctorid, name : newName, phone : newPhone, specialty : newSpecialty};
        try {
            let response = await axios.put(`/appointment`, obj);
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
