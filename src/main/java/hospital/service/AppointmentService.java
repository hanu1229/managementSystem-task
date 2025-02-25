package hospital.service;

import hospital.model.dto.AppointmentDto;
import hospital.model.mapper.AppointmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentMapper appointmentMapper;

    /** 진료 예약 등록 */
    public boolean _register(AppointmentDto appointmentDto) {
        System.out.println(">> AppointmentService.register start");
        System.out.println(">> appointmentDto = " + appointmentDto);
        boolean result = appointmentMapper._register(appointmentDto);
        System.out.println(">> AppointmentService.register end\n");
        return result;
    }

    /** 진료 예약 전체 조회 */
    public List<AppointmentDto> _findAll() {
        System.out.println("AppointmentService._findAll start");
        List<AppointmentDto> result = appointmentMapper._findAll();
        System.out.println("AppointmentService._findAll end\n");
        return result;
    }

    /** 진료 예약 목록 조회 */
    public List<AppointmentDto> _findDate(String appointmentdate) {
        System.out.println(">> AppointmentService._findAll start");
        List<AppointmentDto> result = appointmentMapper._findDate(appointmentdate);
        System.out.println(">> AppointmentService._findAll end\n");
        return result;
    }

    /** 환자별 예약 조회 */
    public List<AppointmentDto> _findPatient(int patientid) {
        System.out.println(">> AppointmentService._findPatient start");
        System.out.println(">> patientid = " + patientid);
        List<AppointmentDto> result = appointmentMapper._findPatient(patientid);
        System.out.println(">> AppointmentService._findPatient end\n");
        return result;
    }

    /** 의사별 예약 조회 */
    public List<AppointmentDto> _findDoctor(int doctorid) {
        System.out.println(">> AppointmentService._findDoctor start");
        System.out.println(">> doctorid = " + doctorid);
        List<AppointmentDto> result = appointmentMapper._findDoctor(doctorid);
        System.out.println(">> AppointmentService._findDoctor end\n");
        return result;
    }

    /** 진료 예약 변경 */
    public boolean _update(AppointmentDto appointmentDto) {
        System.out.println(">> AppointmentService._update start");
        System.out.println(">> appointmentDto = " + appointmentDto);
        boolean result = appointmentMapper._update(appointmentDto);
        System.out.println(">> AppointmentService._update end\n");
        return result;
    }

    /** 진료 예약 취소 */
    public boolean _cancel(int appointmentid) {
        System.out.println(">> AppointmentService._cancel start");
        System.out.println(">> appointmentid = " + appointmentid);
        boolean result = appointmentMapper._cancel(appointmentid);
        System.out.println(">> AppointmentService._cancel end\n");
        return result;
    }

}
