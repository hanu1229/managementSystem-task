package hospital.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class DoctorDto {
    // 의사번호
    private int doctorid;
    // 이름
    private String name;
    // 진료과
    private String specialty;
    // 전화번호
    private String phone;
    // 등록일
    private String createdat;
}
