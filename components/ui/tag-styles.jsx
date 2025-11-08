const tagColors = [
  { bg: "#FEE2E2", text: "#DC2626" }, // 빨간색
  { bg: "#DBEAFE", text: "#2563EB" }, // 파란색
  { bg: "#D1FAE5", text: "#059669" }, // 녹색
  { bg: "#FEF3C7", text: "#D97706" }, // 노란색
  { bg: "#E0E7FF", text: "#7C3AED" }, // 보라색
  { bg: "#FCE7F3", text: "#DB2777" }, // 핑크색
  { bg: "#F3E8FF", text: "#9333EA" }, // 자주색
  { bg: "#ECFDF5", text: "#10B981" }, // 민트색
  { bg: "#FEF2F2", text: "#EF4444" }, // 밝은 빨간색
  { bg: "#EFF6FF", text: "#3B82F6" }, // 하늘색
  { bg: "#F0FDF4", text: "#22C55E" }, // 라임색
  { bg: "#FFFBEB", text: "#F59E0B" }, // 오렌지색
  { bg: "#F5F3FF", text: "#8B5CF6" }, // 라벤더색
  { bg: "#FDF2F8", text: "#EC4899" }, // 로즈색
  { bg: "#F0F9FF", text: "#0EA5E9" }, // 청록색
  { bg: "#ECFCCB", text: "#84CC16" }, // 연두색
  { bg: "#FFF7ED", text: "#EA580C" }, // 주황색
  { bg: "#F8FAFC", text: "#64748B" }, // 회색
  { bg: "#FEFCE8", text: "#CA8A04" }, // 골드색
  { bg: "#F1F5F9", text: "#475569" }, // 슬레이트색
  { bg: "#FFEDD5", text: "#C2410C" }, // 황갈색
  { bg: "#ECFEF3", text: "#16A34A" }, // 에메랄드색
  { bg: "#F3F4F6", text: "#374151" }, // 진회색
  { bg: "#FDF4FF", text: "#A21CAF" }, // 마젠타색
];

const tagColorMapping = new Map();

const getTagColor = (value) => {
  const tagValue = value || "";

  if (tagColorMapping.has(tagValue)) {
    return tagColorMapping.get(tagValue);
  }

  const assignedValues = new Set(
    Array.from(tagColorMapping.values()).map((c) => c.bg + "|" + c.text)
  );
  const availableIndices = [];
  for (let i = 0; i < tagColors.length; i++) {
    const key = tagColors[i].bg + "|" + tagColors[i].text;
    if (!assignedValues.has(key)) availableIndices.push(i);
  }

  let chosenIndex;
  if (availableIndices.length > 0) {
    chosenIndex =
      availableIndices[Math.floor(Math.random() * availableIndices.length)];
  } else {
    chosenIndex = Math.floor(Math.random() * tagColors.length);
  }

  const assignedColor = tagColors[chosenIndex];
  tagColorMapping.set(tagValue, assignedColor);

  return assignedColor;
};

export { getTagColor };

export const resetTagColors = () => {
  tagColorMapping.clear();
  colorIndex = 0;
};

export const getUsedTagColors = () => {
  return Array.from(tagColorMapping.entries()).map(([tag, color]) => ({
    tag,
    color,
  }));
};

export const getCustomStyles = (theme = "light") => ({
  control: (provided, state) => ({
    ...provided,
    backgroundColor:
      theme === "dark"
        ? "color-mix(in oklab, var(--input) 30%, var(--background))"
        : "white",
    borderColor: state.isFocused ? "var(--input)" : "var(--input)",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "var(--input)",
      backgroundColor:
        theme === "dark"
          ? "color-mix(in oklab, var(--input) 50%, var(--background))"
          : "none",
    },
    minHeight: "40px",
    borderRadius: 8,
  }),
  multiValue: (base, { data }) => {
    const colors =
      data && data.bgColor && data.textColor
        ? { bg: data.bgColor, text: data.textColor }
        : getTagColor(data.value || data.label);
    return {
      ...base,
      backgroundColor: colors.bg,
      borderRadius: "6px",
      border: `1px solid ${colors.text}20`,
    };
  },
  multiValueLabel: (base, { data }) => {
    const colors =
      data && data.bgColor && data.textColor
        ? { bg: data.bgColor, text: data.textColor }
        : getTagColor(data.value || data.label);
    return {
      ...base,
      color: colors.text,
      fontWeight: "500",
      fontSize: "12px",
    };
  },
  multiValueRemove: (base, { data }) => {
    const colors =
      data && data.bgColor && data.textColor
        ? { bg: data.bgColor, text: data.textColor }
        : getTagColor(data.value || data.label);
    return {
      ...base,
      color: colors.text,
      ":hover": {
        backgroundColor: colors.text,
        color: "white",
        cursor: "pointer",
      },
    };
  },
  option: (base, state) => ({
    ...base,
    cursor: "pointer",
    backgroundColor:
      theme === "dark"
        ? "color-mix(in oklab, var(--input) 30%, var(--background))"
        : "white",
    color: "var(--foreground)",
    ":hover": {
      ...base[":hover"],
      cursor: "pointer",
      backgroundColor:
        theme === "dark"
          ? "color-mix(in oklab, var(--input) 50%, var(--background))"
          : "var(--input)",
    },
  }),
  menu: (base) => ({
    ...base,
    cursor: "pointer",
    backgroundColor:
      theme === "dark"
        ? "color-mix(in oklab, var(--input) 30%, var(--background))"
        : "white",
  }),
  menuList: (base) => ({
    ...base,
    cursor: "pointer",
    backgroundColor:
      theme === "dark"
        ? "color-mix(in oklab, var(--input) 30%, var(--background))"
        : "white",
  }),
});
