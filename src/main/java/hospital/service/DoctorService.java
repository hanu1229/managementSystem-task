package hospital.service;

import hospital.model.dto.DoctorDto;
import hospital.model.mapper.DoctorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorMapper doctorMapper;

    /** 의사 등록 */
    public boolean _register(DoctorDto doctorDto) {
        System.out.println(">> DoctorService._register start");
        System.out.println(">> doctorDto = " + doctorDto);
        boolean result = doctorMapper._register(doctorDto);
        System.out.println(">> DoctorService._register end\n");
        return result;
    }

    /** 의사 목록 조회 */
    public List<DoctorDto> _findAll() {
        System.out.println(">> DoctorService._findAll start");
        List<DoctorDto> result = doctorMapper._findAll();
        System.out.println(">> DoctorService._findAll end\n");
        return result;
    }

    /** 의사 상세 조회 */
    public DoctorDto _find(int doctorid) {
        System.out.println(">> DoctorService._find start");
        System.out.println(">> doctorid = " + doctorid);
        DoctorDto result = doctorMapper._find(doctorid);
        System.out.println(">> DoctorService._find end\n");
        return result;
    }

    /** 의사 정보 수정 */
    public boolean _update(DoctorDto doctorDto) {
        System.out.println(">> DoctorService._update start");
        System.out.println(">> doctorDto = " + doctorDto);
        boolean result = doctorMapper._update(doctorDto);
        System.out.println(">> DoctorService._update end\n");
        return result;
    }

    /** 의사 삭제 */
    public boolean _delete(int doctorid) {
        System.out.println(">> DoctorService._delete start");
        System.out.println(">> doctorid = " + doctorid);
        boolean result = doctorMapper._delete(doctorid);
        System.out.println(">> DoctorService._delete end\n");
        return result;
    }


}
