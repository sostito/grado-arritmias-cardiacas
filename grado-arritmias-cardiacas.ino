#include <DFRobot_MAX30102.h>

DFRobot_MAX30102 particleSensor;

int32_t SPO2; //SPO2
int8_t SPO2Valid; //Flag to display if SPO2 calculation is valid
int32_t heartRate; //Heart-rate
int8_t heartRateValid;
int8_t heartRateValid2;//Flag to display if heart-rate calculation is valid 

void setup()
{
  Serial.begin(115200);

  while (!particleSensor.begin()) {
    Serial.println("MAX30102 was not found");
  }

  particleSensor.sensorConfiguration(50, SAMPLEAVG_2, \
                        MODE_MULTILED, SAMPLERATE_100, \
                        PULSEWIDTH_411, ADCRANGE_16384);
}

void loop(){
    particleSensor.heartrateAndOxygenSaturation(&SPO2, &SPO2Valid, &heartRate, &heartRateValid);

    Serial.print(heartRate, DEC);
    Serial.print(F(","));
    Serial.print(heartRateValid, DEC);
    Serial.print(F(","));
    Serial.print(SPO2, DEC);
    Serial.print(F(","));
    Serial.println(SPO2Valid, DEC);
} 
