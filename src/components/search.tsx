import { FormInput } from "./form/form-input";
import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForecast } from "@/hooks/use-forecast";
import { IoCloseOutline } from "react-icons/io5";
import { SearchInstruction } from "./seach-instruction";

const rcity = /^[a-zA-Z\s]+$/;
const rcitycountry = /^[a-zA-Z\s]+,\s*[a-zA-Z\s]+$/;
const rzip = /^\d{3-6}$/;
const rzipcountry = /^\d{5},\s*[a-zA-Z\s]+$/;

const Schema = z.object({
  search: z.string().refine((value) => {
    if (value.trim() === "") return true;
    return (
      rcity.test(value) ||
      rcitycountry.test(value) ||
      rzip.test(value) ||
      rzipcountry.test(value)
    );
  }, "Invalid search format"),
});

type FieldTypes = z.infer<typeof Schema>;

const Search = () => {
  const { handleSearchProps } = useForecast();
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm<FieldTypes>({
    resolver: zodResolver(Schema),
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data: FieldTypes) => {
    const search = data.search.trim();
    let city: string | null = null;
    let country: string | null = null;
    let zip: string | null = null;

    if (rcitycountry.test(search))
      [city, country] = search.split(",") || search.split(" ");
    else if (rcity.test(search)) city = search;
    else if (rzipcountry.test(search))
      [zip, country] = search.split(",") || search.split(" ");
    else if (rzip.test(search)) zip = search;

    handleSearchProps({
      zip: zip?.trim() || null,
      city: city?.trim() || null,
      country: country?.trim() || "india",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[24rem]">
      <div className="relative">
        <FiSearch
          size={20}
          className="absolute z-10 left-4 top-[0.9rem]"
          color="#9CA3AF"
        />
        <FormInput
          id="search"
          {...register("search")}
          className="h-12 rounded-full pl-11 pr-10 flex text-start justify-center font-semibold placeholder:font-normal placeholder:text-muted-foreground placeholder:text-base"
          placeholder="search by city & zip code"
          errors={errors.search}
        />
        <button
          hidden={watch("search").length === 0}
          type="button"
          onClick={() => resetField("search")}
          className="absolute outline-none right-5 top-[0.9rem] hover:scale-110"
        >
          <IoCloseOutline color="black" className="hover:scale-105" size={20} />
        </button>
        <SearchInstruction watch={watch} />
      </div>
    </form>
  );
};

export default Search;
