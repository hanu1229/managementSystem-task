package hospital.controller;

import hospital.model.dto.AppointmentDto;
import hospital.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    /** 진료 예약 등록 */
    @PostMapping("/appointment")
    public boolean _register(@RequestBody() AppointmentDto appointmentDto) {
        System.out.println(">> AppointmentController.register start");
        System.out.println(">> appointmentDto = " + appointmentDto);
        boolean result = appointmentService._register(appointmentDto);
        System.out.println(">> AppointmentController.register end\n");
        return result;
    }

    /** 진료 예약 전체 조회 */
    @GetMapping("/appointment")
    public List<AppointmentDto> _findAll() {
        System.out.println(">> AppointmentController._findAll start");
        List<AppointmentDto> result = appointmentService._findAll();
        System.out.println(">> AppointmentController._findAll end\n");
        return result;
    }

    /** 날짜별 예약 목록 조회 */
    @GetMapping("/appointment/date")
    public List<AppointmentDto> _findDate(@RequestParam(name="date") String appointmentdate) {
        System.out.println(">> AppointmentController._findAll start");
        List<AppointmentDto> result = appointmentService._findDate(appointmentdate);
        System.out.println(">> AppointmentController._findAll end\n");
        return result;
    }

    /** 환자별 예약 조회 */
    @GetMapping("/appointment/patient")
    public List<AppointmentDto> _findPatient(@RequestParam(name="patientid") int patientid) {
        System.out.println(">> AppointmentController._findPatient start");
        System.out.println(">> patientid = " + patientid);
        List<AppointmentDto> result = appointmentService._findPatient(patientid);
        System.out.println(">> AppointmentController._findPatient end\n");
        return result;
    }

    /** 의사별 예약 조회 */
    @GetMapping("/appointment/doctor")
    public List<AppointmentDto> _findDoctor(@RequestParam(name="doctorid") int doctorid) {
        System.out.println(">> AppointmentController._findDoctor start");
        System.out.println(">> doctorid = " + doctorid);
        List<AppointmentDto> result = appointmentService._findDoctor(doctorid);
        System.out.println(">> AppointmentController._findDoctor end\n");
        return result;
    }

    /** 진료 예약 변경 */
    @PutMapping("/appointment")
    public boolean _update(@RequestBody() AppointmentDto appointmentDto) {
        System.out.println(">> AppointmentController._update start");
        System.out.println(">> appointmentDto = " + appointmentDto);
        boolean result = appointmentService._update(appointmentDto);
        System.out.println(">> AppointmentController._update end\n");
        return result;
    }

    /** 진료 예약 취소 */
    @DeleteMapping("/appointment")
    public boolean _cancel(@RequestParam(name="appointmentid") int appointmentid) {
        System.out.println(">> AppointmentController._cancel start");
        System.out.println(">> appointmentid = " + appointmentid);
        boolean result = appointmentService._cancel(appointmentid);
        System.out.println(">> AppointmentController._cancel end\n");
        return result;
    }

}
