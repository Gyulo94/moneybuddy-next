"use client";

import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { getCustomStyles, getTagColor } from "@/components/ui/tag-styles";
import { useFindTagsByUserId } from "@/lib/query";
import { Tag } from "@/lib/types/tag";
import { IncomeFormSchema } from "@/lib/validations";
import { TagSchema } from "@/lib/validations/transaction";
import { Tags } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { toast } from "sonner";
import z from "zod/v3";

interface Props {
  form: UseFormReturn<z.infer<typeof IncomeFormSchema>>;
}

export default function TagSection({ form }: Props) {
  const { data: tags, isLoading } = useFindTagsByUserId();
  const { theme: nextTheme, systemTheme } = useTheme();
  const resolvedTheme = nextTheme === "system" ? systemTheme : nextTheme;
  const [effectiveTheme, setEffectiveTheme] = React.useState<string | null>(
    resolvedTheme ?? null
  );

  React.useEffect(() => {
    if (resolvedTheme) {
      setEffectiveTheme(resolvedTheme);
    } else if (typeof document !== "undefined") {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setEffectiveTheme(hasDarkClass ? "dark" : "light");
    }
  }, [resolvedTheme]);

  const styles = getCustomStyles(effectiveTheme ?? "light");
  const MAX_TAGS = 3;

  return (
    <div className="relative flex items-center w-full mb-3">
      <span className="absolute top-2 text-gray-500">
        <Tags className="size-6" />
      </span>
      <div className="ml-10 w-full">
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CreatableSelect
                  isLoading={isLoading}
                  options={(tags ?? []).map((t: Tag) => ({
                    label: t.name,
                    value: t.name,
                    bgColor: t.bgColor,
                    textColor: t.textColor,
                  }))}
                  isMulti
                  styles={styles}
                  placeholder="태그를 선택하거나 새로 생성하세요..."
                  noOptionsMessage={() => "태그가 없습니다"}
                  formatCreateLabel={(inputValue) =>
                    `"${inputValue}" 태그 생성`
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const selected = (field.value || []) as z.infer<
                        typeof TagSchema
                      >[];
                      if (selected.length >= MAX_TAGS) {
                        e.preventDefault();
                        e.stopPropagation();
                        toast.error(
                          `태그는 최대 ${MAX_TAGS}개까지만 추가할 수 있습니다.`
                        );
                        return;
                      }
                      e.stopPropagation();
                    }
                  }}
                  value={(field.value || []).map(
                    (v: string | z.infer<typeof TagSchema>) => {
                      if (typeof v === "string") {
                        const found = (tags ?? []).find(
                          (t: Tag) => t.name === v
                        );
                        return found
                          ? {
                              label: found.name,
                              value: found.name,
                              bgColor: found.bgColor,
                              textColor: found.textColor,
                            }
                          : { label: v, value: v };
                      }
                      return {
                        label: v.name,
                        value: v.name,
                        bgColor: v.bgColor,
                        textColor: v.textColor,
                      };
                    }
                  )}
                  onChange={(
                    selected: ReadonlyArray<{
                      value: string;
                      bgColor?: string;
                      textColor?: string;
                    }> | null
                  ) =>
                    field.onChange(
                      selected
                        ? selected.map((s) => ({
                            name: s.value,
                            bgColor: s.bgColor || "",
                            textColor: s.textColor || "",
                          }))
                        : []
                    )
                  }
                  isOptionDisabled={(option: { value: string }) => {
                    const selected = (field.value || []) as z.infer<
                      typeof TagSchema
                    >[];
                    return (
                      selected.length >= MAX_TAGS &&
                      !selected.some((t) => t.name === option.value)
                    );
                  }}
                  onCreateOption={(inputValue) => {
                    const colors = getTagColor(inputValue || "");
                    const newTag = {
                      name: inputValue,
                      bgColor: colors.bg,
                      textColor: colors.text,
                    };
                    field.onChange([...(field.value || []), newTag]);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
