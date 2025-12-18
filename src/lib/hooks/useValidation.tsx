import { useState } from "react"
import { z } from "zod"

type FormDataValidation = Record<string, FormDataEntryValue>

export const useValidation = <T,>({
	defaultSchema
}: {
	defaultSchema?: z.ZodSchema<T>
}) => {
	const [errors, setErrors] = useState<T>()

	const validate = ({
		formData,
		schema
	}: {
		formData: FormDataValidation
		schema?: z.ZodType<T>
	}) => {
		const result =
			schema?.safeParse(formData) ?? defaultSchema?.safeParse(formData)

		if (!result) {
			throw new Error("No schema provided")
		}

		if (!result.success) {
			setErrors(z.flattenError(result.error).fieldErrors as T)
			return false
		}

		setErrors(undefined)
		return true
	}

	return { errors, validate }
}
