package hospital.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class PatientDto {
    // 환자번호
    private int patientid;
    // 이름
    private String name;
    // 생년월일
    private String birthdate;
    // 전화번호
    private String phone;
    // 주소
    private String address;
    // 등록일
    private String createdat;
}
