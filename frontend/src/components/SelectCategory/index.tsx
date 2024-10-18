import CircularProgressLoading from "../CircularProgressLoading";

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { SelectCategoryProps } from "../ItemContainer";
import { Category } from "../../schemas/models";

interface ISelectCategoryProps {
    categories?: SelectCategoryProps;
    selectedCategory?: Category;
    setSelectedCategory: (category: Category) => void;
    size?: "small" | "medium";
    required: boolean
}

export default function SelectCategory({ categories, selectedCategory, setSelectedCategory, size, required }: ISelectCategoryProps) {

    const handleChangeCategory = (event: SelectChangeEvent) => {
        const categoryId = event.target.value;
        const selectedCategory = (categories?.categories && categories?.categories.find((category) => category.id === Number(categoryId))) ?? undefined;

        if (selectedCategory) {
            setSelectedCategory(selectedCategory);
        }
    };

    return (
        (categories && !categories.loading && categories.categories) ?
            <FormControl fullWidth required size={size ?? 'medium'} >
                <InputLabel id="category" required={required} >Categoria</InputLabel>
                <Select
                    labelId="category"
                    label="Categoria"
                    required={required}
                    size={size ?? 'medium'}
                    id="category"
                    value={selectedCategory?.id ? String(selectedCategory?.id) : ''}
                    onChange={handleChangeCategory}
                >
                    {categories.categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> :
            <CircularProgressLoading />
    );
};
