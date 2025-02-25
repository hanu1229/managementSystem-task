package hospital.service;

import hospital.model.dto.PatientDto;
import hospital.model.mapper.PatientMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientMapper patientMapper;

    /** 환자 등록 */
    public boolean _register(PatientDto patientDto) {
        System.out.println(">> PatientService._register start");
        System.out.println(">> patientDto = " + patientDto);
        boolean result = patientMapper._register(patientDto);
        System.out.println(">> PatientService._register end\n");
        return result;
    }

    /** 환자 목록 조회 */
    public List<PatientDto> _findAll() {
        System.out.println(">> PatientService._findAll start");
        List<PatientDto> result = patientMapper._findAll();
        System.out.println(">> PatientService._findAll end\n");
        return result;
    }

    /** 환자 상세 조회 */
    public PatientDto _find(int patientid) {
        System.out.println(">> PatientService._find start");
        System.out.println(">> patientid = " + patientid);
        PatientDto result = patientMapper._find(patientid);
        System.out.println(">> PatientService._find end\n");
        return result;
    }

    /** 환자 정보 수정 */
    public boolean _update(PatientDto patientDto) {
        System.out.println(">> PatientService._update start");
        System.out.println(">> patientDto = " + patientDto);
        boolean result = patientMapper._update(patientDto);
        System.out.println(">> PatientService._update end\n");
        return result;
    }

    /** 환자 삭제 */
    public boolean _delete(int patientid) {
        System.out.println(">> PatientService._delete start");
        System.out.println(">> patientid = " + patientid);
        boolean result = patientMapper._delete(patientid);
        System.out.println(">> PatientService._delete end\n");
        return result;
    }

}
