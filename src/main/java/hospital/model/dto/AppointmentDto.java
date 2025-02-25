package hospital.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @ToString
public class AppointmentDto {
    // 예약번호
    private int appointmentid;
    // 환자번호
    private int patientid;
    // 의사번호
    private int doctorid;
    // 예약날짜
    private String appointmentdate;
    // 예약시간
    private String appointmenttime;
    // 예약상태
    private int status;
    // 예약한 날
    private String createdat;
}
