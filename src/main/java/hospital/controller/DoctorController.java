package hospital.controller;

import hospital.model.dto.DoctorDto;
import hospital.service.DoctorService;
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
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    /** 의사 등록 */
    @PostMapping("/doctor")
    public boolean _register(@RequestBody() DoctorDto doctorDto) {
        System.out.println(">> DoctorController._register start");
        System.out.println(">> doctorDto = " + doctorDto);
        boolean result = doctorService._register(doctorDto);
        System.out.println(">> DoctorController._register end\n");
        return result;
    }

    /** 의사 목록 조회 */
    @GetMapping("/doctor")
    public List<DoctorDto> _findAll() {
        System.out.println(">> DoctorController._findAll start");
        List<DoctorDto> result = doctorService._findAll();
        System.out.println(">> DoctorController._findAll end\n");
        return result;
    }

    /** 의사 상세 조회 */
    @GetMapping("/doctor/detail")
    public DoctorDto _find(@RequestParam(name="doctorid") int doctorid) {
        System.out.println(">> DoctorController._find start");
        System.out.println(">> doctorid = " + doctorid);
        DoctorDto result = doctorService._find(doctorid);
        System.out.println(">> DoctorController._find end\n");
        return result;
    }

    /** 의사 정보 수정 */
    @PutMapping("/doctor")
    public boolean _update(@RequestBody() DoctorDto doctorDto) {
        System.out.println(">> DoctorController._update start");
        System.out.println(">> doctorDto = " + doctorDto);
        boolean result = doctorService._update(doctorDto);
        System.out.println(">> DoctorController._update end\n");
        return result;
    }

    /** 의사 삭제 */
    @DeleteMapping("/doctor")
    public boolean _delete(@RequestParam(name="doctorid") int doctorid) {
        System.out.println(">> DoctorController._delete start");
        System.out.println(">> doctorid = " + doctorid);
        boolean result = doctorService._delete(doctorid);
        System.out.println(">> DoctorController._delete end\n");
        return result;
    }

}
