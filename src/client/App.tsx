import React, {useState} from 'react';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import FormInputEntry from './components/form/FormInputEntry';
import Button from './components/base/Button';
import {submitFormRequest} from './api/formSubmission';
import {MeasurementType, NewsMeasurementData} from "./types/measurement";

function App() {

    const [newsValue, setNewsValue] = useState<number | undefined>(undefined);

    const [formValues, setFormValues] = useState<NewsMeasurementData>({
        measurements: [
            { type: MeasurementType.TEMP, value: undefined },
            { type: MeasurementType.RR, value: undefined },
            { type: MeasurementType.HR, value: undefined },
        ]
    });

    const handleFormValueChange = (id: string, value: string) => {
        setFormValues(prevValues => {
            const newMeasurements = prevValues.measurements.map(measurement => {
                if (measurement.type == id) {
                    return { ...measurement, value: Number(value) };
                }
                return measurement;
            });
            return {...prevValues, measurements: newMeasurements};
        })
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submitFormRequest(formValues)
            .then(res => {
                console.log("Got something back ", res);
                setNewsValue(res.score);
            })
            .catch(error => {
                console.error("error submitting form ", error);
            });
    }

    const handleReset = () => {
        setFormValues({
            measurements: [
                { type: MeasurementType.TEMP, value: undefined },
                { type: MeasurementType.RR, value: undefined },
                { type: MeasurementType.HR, value: undefined },
            ]
        });
        setNewsValue(undefined);
    }

    return (
        <main className="min-w-[404px] min-h-[532px]">
            <form className="w-full" aria-labelledby="form-title" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="space-y-[40px]">
                    <h2 className="font-semibold text-[20px]" id="form-title">NEWS score calculator</h2>
                    <FormInputEntry
                        id={MeasurementType.TEMP}
                        header="Body temperature"
                        subHeader="Degrees celcius"
                        required
                        onChange={handleFormValueChange} />
                    <FormInputEntry
                        id={MeasurementType.HR}
                        header="Heartrate"
                        subHeader="Beats per minute"
                        required
                        onChange={handleFormValueChange} />
                    <FormInputEntry
                        id={MeasurementType.RR}
                        header="Respiratory rate"
                        subHeader="Breaths per minute"
                        required
                        onChange={handleFormValueChange} />
                    <div className="space-x-[24px]">
                        <Button
                            text="Calculate NEWS Score"
                            id="form-submit"
                            type="submit"
                            className="bg-[#7424DA] rounded-full px-[16px] py-[8px] font-normal text-white cursor-pointer"
                        />
                        <Button
                            text="Reset form"
                            id="form-reset"
                            type="reset"
                            className="bg-[#FAF6FF] rounded-full px-[16px] py-[8px] font-normal cursor-pointer"
                        />
                    </div>
                    {newsValue && (
                        <div className="bg-[#FAF6FF] border border-[#7424DA66] rounded-[10px] px-[16px] py-[16px]">
                            News score: <span className="font-semibold">{newsValue}</span>
                        </div>
                    )}
                </div>
            </form>
        </main>
    )
}

export default App
