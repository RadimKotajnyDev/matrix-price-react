import {useFormik} from "formik";
import * as Yup from "yup"
/*
    Pricing
    BookingFeeAbsolute
    BookingFeePercent
    PriceSelling
    Inside commission
*/
const Pricing = () => {
    const formik = useFormik({
        initialValues: {
            BookingFeeAbsolute: '',
            BookingFeePercent: '',
            PriceSelling: '',
            InsideCommission: '',
        },
        validationSchema: Yup.object({
            BookingFeeAbsolute: Yup.number()
                .min(0, "BookingFeeAbsolute must be 0£ minimum!")
                .required("BookingFeeAbsolute is required"),
            BookingFeePercent: Yup.number()
                .min(0, "BookingFeePercent must be 0£ minimum!")
                .required("BookingFeePercent is Required"),
            PriceSelling: Yup.number()
                .min(0, "PriceSelling must be 0£ minimum!")
                .required("PriceSelling is Required"),
            InsideCommission: Yup.number()
                .min(0, "InsideCommission must be 0% minimum!")
                .required("Inside Commission is Required"),
        }),
        onSubmit: (/*values */) => {

        },
    })
    //console.log(formik.values)
    return (
        <div
            className="mt-14 border w-fit p-2 rounded text-sm">
            <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Pricing</h1>
            <div className="grid grid-flow-row">
                <div className="grid grid-cols-2 w-72">
                    <label htmlFor="BookingFeeAbsolute" className={`font-light mt-1 ${formik.touched.BookingFeeAbsolute && formik.errors.BookingFeeAbsolute ? "text-red-600" : ""}`}>{formik.touched.BookingFeeAbsolute && formik.errors.BookingFeeAbsolute ? formik.errors.BookingFeeAbsolute : "BookingFeeAbsolute"}</label>
                    <input type="number" required id="BookingFeeAbsolute"
                           value={formik.values.BookingFeeAbsolute}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           className={`appearance-none text-gray-700 bg-gray-200 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
                           ${formik.touched.BookingFeeAbsolute && formik.errors.BookingFeeAbsolute ? "border-red-400 focus:border-red-700 " : "border-gray-200 focus:border-gray-500"}
                           `}
                           placeholder="£">
                    </input>
                </div>
                <div className="grid grid-cols-2 w-72">
                    <label htmlFor="BookingFeePercent" className={`font-light mt-1 ${formik.touched.BookingFeePercent && formik.errors.BookingFeePercent ? "text-red-600" : ""}`}>{formik.touched.BookingFeePercent && formik.errors.BookingFeePercent ? formik.errors.BookingFeePercent : "BookingFeePercent"}</label>
                    <input type="number" required id="BookingFeePercent"
                           value={formik.values.BookingFeePercent}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           className={`appearance-none text-gray-700 bg-gray-200 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white 
                           ${formik.touched.BookingFeePercent && formik.errors.BookingFeePercent ? "border-red-400 focus:border-red-700 " : "border-gray-200 focus:border-gray-500"}
                           `}
                           placeholder="%">
                    </input>
                </div>
                <div className="grid grid-cols-2 w-72">
                    <label htmlFor="PriceSelling" className={`font-light mt-1 ${formik.touched.PriceSelling && formik.errors.PriceSelling ? "text-red-600" : ""}`}>{formik.touched.PriceSelling && formik.errors.PriceSelling ? formik.errors.PriceSelling : "PriceSelling"}</label>
                    <input type="number" required id="PriceSelling"
                           value={formik.values.PriceSelling}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           className={`appearance-none text-gray-700 bg-gray-200 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                           ${formik.touched.PriceSelling && formik.errors.PriceSelling ? "border-red-400 focus:border-red-700 " : "border-gray-200 focus:border-gray-500"}
                           `}
                           placeholder="&#163;">
                    </input>
                </div>
                <div className="grid grid-cols-2 w-72">
                    <label htmlFor="InsideCommission" className={`font-light mt-1 ${formik.touched.InsideCommission && formik.errors.InsideCommission ? "text-red-600" : ""}`}>{formik.touched.InsideCommission && formik.errors.InsideCommission ? formik.errors.InsideCommission : "Inside Commission"}</label>
                    <input type="number" required id="InsideCommission"
                           value={formik.values.InsideCommission}
                           onChange={formik.handleChange}
                           onBlur={formik.handleBlur}
                           className={`appearance-none text-gray-700 bg-gray-200 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                           ${formik.touched.InsideCommission && formik.errors.InsideCommission ? "border-red-400 focus:border-red-700 " : "border-gray-200 focus:border-gray-500"}
                           `}
                           placeholder="%">
                    </input>
                </div>
            </div>
        </div>
    );
}

export default Pricing;