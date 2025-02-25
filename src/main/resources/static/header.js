

console.log("header.js open");

let createHeader = (num) => {
    let header = document.querySelector("#header");
    let html = `
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style="width: 280px; height: 100%;">
        <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
          <span class="fs-4">더조은 병원</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item">
            <a href="http://localhost:8080/index.html" id = "appointment_page" class="nav-link active" aria-current="page">
              예약 정보
            </a>
          </li>
          <li>
            <a href="http://localhost:8080/patient.html" id = "patient_page" class="nav-link link-body-emphasis">
              환자 정보
            </a>
          </li>
          <li>
            <a href="http://localhost:8080/doctor.html" id = "doctor_page" class="nav-link link-body-emphasis">
              의사 정보
            </a>
          </li>
        </ul>
      </div>
    `;
    header.innerHTML = html;
    if(num == 1) {
        console.log("예약 관리 실행");
        document.querySelector("#appointment_page").classList.add("active");
        document.querySelector("#patient_page").classList.add("link-body-emphasis");
        document.querySelector("#doctor_page").classList.add("link-body-emphasis");
        document.querySelector("#appointment_page").classList.remove("link-body-emphasis");
        document.querySelector("#patient_page").classList.remove("active");
        document.querySelector("#doctor_page").classList.remove("active");
        console.log("예약 관리 종료");
    } else if(num == 2) {
        console.log("환자 관리 실행");
        document.querySelector("#appointment_page").classList.add("link-body-emphasis");
        document.querySelector("#patient_page").classList.add("active");
        document.querySelector("#doctor_page").classList.add("link-body-emphasis");
        document.querySelector("#appointment_page").classList.remove("active");
        document.querySelector("#patient_page").classList.remove("link-body-emphasis");
        document.querySelector("#doctor_page").classList.remove("active");
        console.log("환자 관리 종료");
    } else if(num == 3) {
        console.log("의사 관리 실행");
        document.querySelector("#appointment_page").classList.add("link-body-emphasis");
        document.querySelector("#patient_page").classList.add("link-body-emphasis");
        document.querySelector("#doctor_page").classList.add("active");
        document.querySelector("#appointment_page").classList.remove("active");
        document.querySelector("#patient_page").classList.remove("active");
        document.querySelector("#doctor_page").classList.remove("link-body-emphasis");
        console.log("의사 관리 종료");
    }

}
