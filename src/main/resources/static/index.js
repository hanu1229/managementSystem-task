

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
    let dateInput = document.querySelector("#date-input");
    let pselects = document.querySelector("#pselect");
    let dselects = document.querySelector("#dselect");
    let html = ``;
    let pselect = `<option value="0">전체</option>`;
    let dselect = `<option value="0">전체</option>`;

    try {
        // 현재 날짜 불러와 출력하는 부분
        let now = new Date();
        dateInput.value = `${now.getFullYear()}-${now.getMonth()+1 < 10 ? "0" + (now.getMonth()+1) : now.getMonth()+1}-${now.getDate() < 10 ? "0" + now.getDate() : now.getDate()}`;
        // 등록된 환자 총 인원수 구해오는 부분
        let patientList = await axios.get("/patient");
        console.log(patientList.data);
        patientList.data.forEach(patient => {
            pselect += `
            <option value=${patient.patientid}>${patient.patientid}</option>
            `;
        });
        pselects.innerHTML = pselect;

        // 등록된 의사 총 인원수 구해오는 부분
        let doctorList = await axios.get("/doctor");
        console.log(doctorList.data);
        doctorList.data.forEach(doctor => {
            dselect += `
            <option value=${doctor.doctorid}>${doctor.doctorid}</option>
            `;
        });
        dselects.innerHTML = dselect;

        // 예약 목록 불러오는 부분
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
                    <button type="button" onclick="_update(${appointment.appointmentid}, '${appointment.appointmentdate}', '${appointment.appointmenttime}')">수정</button>
                    <button type="button" onclick="_cancel(${appointment.appointmentid})">취소</button>
                </td>
            </tr>
            `;
        });
        tbody.innerHTML = html;
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
                    <td>${appointment.patientid}</td>
                    <td>${appointment.doctorid}</td>
                    <td>${appointment.appointmentdate}</td>
                    <td>${appointment.appointmenttime}</td>
                    <td>${appointment.status}</td>
                    <td>${appointment.createdat}</td>
                    <td>
                        <button type="button" onclick="_update(${appointment.appointmentid}, '${appointment.appointmentdate}', '${appointment.appointmenttime}')">수정</button>
                        <button type="button" onclick="_cancel(${appointment.appointmentid})">취소</button>
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

/** 날짜별 예약 목록 출력 */
let _findDate = async () => {
    let dataInput = document.querySelector("#date-input");
    let tbody = document.querySelector("#appointment-table > table > tbody");
    let html = ``;
    try {
        if(dataInput.value == "") {
            _printAll();
        } else {
            let response = await axios.get(`/appointment/date?date=${dataInput.value}`);
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
                        <button type="button" onclick="_update(${appointment.appointmentid}, '${appointment.appointmentdate}', '${appointment.appointmenttime}')">수정</button>
                        <button type="button" onclick="_cancel(${appointment.appointmentid})">취소</button>
                    </td>
                </tr>
                `;
            });
            tbody.innerHTML = html;
        }
    } catch(e) {
        console.log(e);
    }
}

/** 환자별 예약 목록 출력 */
let _findPatient = async () => {
        let pselect = document.querySelector("#pselect");
        let tbody = document.querySelector("#appointment-table > table > tbody");
        let html = ``;
        try {
            if(pselect.value == 0) {
                _printAll();
            } else {
                let response = await axios.get(`/appointment/patient?patientid=${pselect.value}`);
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
                            <button type="button" onclick="_update(${appointment.appointmentid}, '${appointment.appointmentdate}', '${appointment.appointmenttime}')">수정</button>
                            <button type="button" onclick="_cancel(${appointment.appointmentid})">취소</button>
                        </td>
                    </tr>
                    `;
                });
                tbody.innerHTML = html;
            }
        } catch(e) {
            console.log(e);
        }
}

/** 의사별 예약 목록 출력 */
let _findDoctor = async () => {
        let dselect = document.querySelector("#dselect");
        let tbody = document.querySelector("#appointment-table > table > tbody");
        let html = ``;
        try {
            if(dselect.value == 0) {
                _printAll();
            } else {
                let response = await axios.get(`/appointment/doctor?doctorid=${dselect.value}`);
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
                            <button type="button" onclick="_update(${appointment.appointmentid}, '${appointment.appointmentdate}', '${appointment.appointmenttime}')">수정</button>
                            <button type="button" onclick="_cancel(${appointment.appointmentid})">취소</button>
                        </td>
                    </tr>
                    `;
                });
                tbody.innerHTML = html;
            }
        } catch(e) {
            console.log(e);
        }

}

/** 진료 예약 등록 */
let _register = async () => {
    let patientid = document.querySelector("#patient-register");
    let doctorid = document.querySelector("#doctor-register");
    let appointmentdate = document.querySelector("#date-register");
    let appointmenttime = document.querySelector("#time-register");
    try {
        let state = confirm(`회원 ID : ${patientid.value}\n의사 ID : ${doctorid.value}\n예약날짜 : ${appointmentdate.value}\n예약시간 : ${appointmenttime.value}\n정말 등록하시겠습니까?`);
        if(state) {
            let obj = {
            patientid : patientid.value,
            doctorid : doctorid.value,
            appointmentdate : appointmentdate.value,
            appointmenttime : appointmenttime.value,
            status : 1
            };
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
let _update = async (appointmentid, appointmentdate, appointmenttime) => {
    let state = confirm("정말 수정하시겠습니까?");
    if(state) {
        let newDate = prompt(`변경 날짜를 입력해주세요 : ${appointmentdate}`, `${appointmentdate}`);
        let newTime = prompt(`변경 시간을 입력해주세요 : ${appointmenttime}`, `${appointmenttime}`);
        let obj = {appointmentid : appointmentid, appointmentdate : newDate, appointmenttime : newTime};
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

/** 진료 예약 취소 */
let _cancel = async (appointmentid) => {
    let state = confirm("정말 취소하시겠습니까?");
    if(state) {
        try {
            let response = await axios.delete(`/appointment?appointmentid=${appointmentid}`);
            if(response.data == true) {
                alert("예약이 취소되었습니다.");
                _printAll();
            } else {
                alert("예약 취소를 실패했습니다.");
            }
        } catch(e) {
            console.log(e);
        }
    }
}
