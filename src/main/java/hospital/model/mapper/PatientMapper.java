package hospital.model.mapper;

import hospital.model.dto.PatientDto;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface PatientMapper {

    /** 환자 등록 */
    @Insert("insert into patient(name, birthdate, phone, address) " +
            "values(#{name}, #{birthdate}, #{phone}, #{address})")
    boolean _register(PatientDto patientDto);

    /** 환자 목록 조회 */
    @Select("select * from patient")
    List<PatientDto> _findAll();

    /** 환자 상세 조회 */
    @Select("select * from patient where patientid = #{patientid}")
    PatientDto _find(int patientid);

    /** 환자 정보 수정 */
    @Update("update patient set name = #{name}, phone = #{phone}, address = #{address} " +
            "where patientid = #{patientid}")
    boolean _update(PatientDto patientDto);

    /** 환자 삭제 */
    @Delete("delete from patient where patientid = #{patientid}")
    boolean _delete(int patientid);
}
