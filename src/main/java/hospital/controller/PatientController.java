package hospital.controller;

import hospital.model.dto.PatientDto;
import hospital.service.PatientService;
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
public class PatientController {

    @Autowired
    private PatientService patientService;

    /** 환자 등록 */
    @PostMapping("/patient")
    public boolean _register(@RequestBody() PatientDto patientDto) {
        System.out.println(">> PatientController._register start");
        System.out.println(">> patientDto = " + patientDto);
        boolean result = patientService._register(patientDto);
        System.out.println(">> PatientController._register end\n");
        return result;
    }

    /** 환자 목록 조회 */
    @GetMapping("/patient")
    public List<PatientDto> _findAll() {
        System.out.println(">> PatientController._findAll start");
        List<PatientDto> result = patientService._findAll();
        System.out.println(">> PatientController._findAll end\n");
        return result;
    }

    /** 환자 상세 조회 */
    @GetMapping("/patient/detail")
    public PatientDto _find(@RequestParam(name="patientid") int patientid) {
        System.out.println(">> PatientController._find start");
        System.out.println(">> patientid = " + patientid);
        PatientDto result = patientService._find(patientid);
        System.out.println(">> PatientController._find end\n");
        return result;
    }

    /** 환자 정보 수정 */
    @PutMapping("/patient")
    public boolean _update(@RequestBody() PatientDto patientDto) {
        System.out.println(">> PatientController._update start");
        System.out.println(">> patientDto = " + patientDto);
        boolean result = patientService._update(patientDto);
        System.out.println(">> PatientController._update end\n");
        return result;
    }

    /** 환자 삭제 */
    @DeleteMapping("/patient")
    public boolean _delete(@RequestParam(name="patientid") int patientid) {
        System.out.println(">> PatientController._delete start");
        System.out.println(">> patientid = " + patientid);
        boolean result = patientService._delete(patientid);
        System.out.println(">> PatientController._delete end\n");
        return result;
    }

}
