import z from 'zod';

export const createCabinSchema = z
  .object({
    name: z.string().min(1, 'Cabin name is a required field'),
    maxCapacity: z
      .number('Max capacity is required')
      .min(1, 'Max capacity must be greater than zero'),
    regularPrice: z
      .number('Reqular price is required')
      .min(1, 'Reqular price must be greater than zero'),
    discount: z
      .number('Discount is required')
      .min(0, 'Discount must be greater than or equal to zero'),
    description: z.preprocess(
      (val) => (val === '' ? null : val),
      z.string().nullable()
    ),
    imageFile: z
      .instanceof(FileList)
      .transform((fileList) => fileList[0])
      .superRefine((val, ctx) => {
        if (!(val instanceof File)) {
          ctx.addIssue({
            message: 'Cabin name is required',
            code: 'invalid_type',
            expected: 'file',
          });
        } else if (!val.type.startsWith('image')) {
          ctx.addIssue({
            code: 'invalid_format',
            format: val.type,
            message: 'Only images are allowed',
          });
        } else if (val.size > 5000000) {
          ctx.addIssue({
            message: 'Max file size is 5MB',
            code: 'too_big',
            maximum: 5000000,
            origin: 'file',
          });
        }
      })
      .nullable(),
  })
  .refine(({ discount, regularPrice }) => discount < regularPrice, {
    error: 'Discount must be less than the regular price',
    path: ['discount'],
  });
