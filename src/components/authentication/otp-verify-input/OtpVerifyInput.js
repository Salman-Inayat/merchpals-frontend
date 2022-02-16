import OtpInput from 'react-otp-input';

const OtpVerifyInput = ({ otp, setOtp }) => {
  return (
    <OtpInput
      numInputs="4"
      isInputNum="true"
      value={otp}
      onChange={num => setOtp(num)}
      inputStyle={{
        width: '3rem',
        height: '3rem',
        margin: '0 1rem',
        fontSize: '2rem',
        borderRadius: 4,
        border: '1px solid rgba(0,0,0,0.3)',
      }}
    />
  );
};

export default OtpVerifyInput;
