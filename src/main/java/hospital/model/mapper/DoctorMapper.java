package hospital.model.mapper;

import hospital.model.dto.DoctorDto;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface DoctorMapper {

    /** 의사 등록 */
    @Insert("insert into doctor(name, specialty, phone) values(#{name}, #{specialty}, #{phone})")
    boolean _register(DoctorDto doctorDto);

    /** 의사 목록 조회 */
    @Select("select * from doctor")
    List<DoctorDto> _findAll();

    /** 의사 상세 조회 */
    @Select("select * from doctor where doctorid = #{doctorid}")
    DoctorDto _find(int doctorid);

    /** 의사 정보 수정 */
    @Update("update doctor set name = #{name}, specialty = #{specialty}, phone = #{phone} where doctorid = #{doctorid}")
    boolean _update(DoctorDto doctorDto);

    /** 의사 삭제 */
    @Delete("delete from doctor where doctorid = #{doctorid}")
    boolean _delete(int doctorid);


}
