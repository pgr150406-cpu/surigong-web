export type WorkInput = {
  city: string;
  district: string;
  dong: string;
  service: string;
  date: string;
  problem: string;
  work: string;
  result: string;
};
export type Photo = {
  data: string;
  caption: string;
  stage: "작업 전" | "작업 중" | "작업 후";
};
export type WorkPost = WorkInput & {
  id: string;
  title: string;
  body: string;
  blogTitle: string;
  blogBody: string;
  publishedAt: string;
  photos: Photo[];
};
export function createDraft(input: WorkInput) {
  const area = [input.city, input.district, input.dong]
    .filter(Boolean)
    .join(" ");
  return {
    title: `${area} ${input.service} 작업사례`,
    body: `${area}에서 진행한 ${input.service} 작업을 소개합니다.\n\n작업일: ${input.date}\n\n현장 문제\n${input.problem}\n\n진행한 작업\n${input.work}\n\n작업 후 확인\n${input.result}\n\n관련 작업 문의: 수리공 010-2892-0819`,
    blogTitle: `${area} ${input.service}, 현장 작업 과정과 확인 결과`,
    blogBody: `안녕하세요. 수리공입니다.\n이번에는 ${area}에서 진행한 ${input.service} 현장을 소개합니다.\n작업일은 ${input.date}입니다.\n\n어떤 문제가 있었나요?\n${input.problem}\n\n현장에서는 이렇게 작업했습니다.\n${input.work}\n\n작업 후 확인한 내용입니다.\n${input.result}\n\n작업 전·중·후 사진은 아래에 순서대로 첨부해 주세요.\n현장 조건에 따라 작업 범위는 달라질 수 있습니다.\n문의: 010-2892-0819\n\n#수리공 #${input.dong.replace(/\s/g, "")}${input.service.replace(/\s/g, "")}`,
  };
}
export function validatePost(value: unknown): Omit<WorkPost, "publishedAt"> {
  if (!value || typeof value !== "object")
    throw new Error("입력 정보를 확인해주세요.");
  const v = value as Record<string, unknown>;
  const fields = [
    "city",
    "district",
    "dong",
    "service",
    "date",
    "problem",
    "work",
    "result",
    "title",
    "body",
    "blogTitle",
    "blogBody",
  ] as const;
  for (const field of fields) {
    const max = ["body", "blogBody"].includes(field)
      ? 12000
      : ["problem", "work", "result"].includes(field)
        ? 4000
        : 150;
    if (
      typeof v[field] !== "string" ||
      !(v[field] as string).trim() ||
      (v[field] as string).length > max
    )
      throw new Error(`${field}: 필수 값 또는 글 길이를 확인해주세요.`);
  }
  if (typeof v.id !== "string" || !/^[a-f0-9-]{36}$/.test(v.id))
    throw new Error("게시물 번호가 올바르지 않습니다.");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(v.date as string) ||
    Number.isNaN(Date.parse(v.date as string))
  )
    throw new Error("작업일을 확인해주세요.");
  if (!Array.isArray(v.photos) || v.photos.length > 6)
    throw new Error("사진은 최대 6장입니다.");
  const photos = v.photos.map((photo: Photo) => {
    if (
      !photo ||
      typeof photo.data !== "string" ||
      photo.data.length > 100000 ||
      !/^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(photo.data)
    )
      throw new Error("사진 크기 또는 형식을 확인해주세요.");
    const bytes = Buffer.from(photo.data.split(",")[1], "base64");
    if (bytes[0] !== 255 || bytes[1] !== 216 || bytes[2] !== 255)
      throw new Error("JPEG 사진만 등록할 수 있습니다.");
    if (
      !["작업 전", "작업 중", "작업 후"].includes(photo.stage) ||
      typeof photo.caption !== "string" ||
      photo.caption.length > 200
    )
      throw new Error("사진 설명을 확인해주세요.");
    return { data: photo.data, caption: photo.caption, stage: photo.stage };
  });
  return {
    ...Object.fromEntries(fields.map((field) => [field, v[field]])),
    id: v.id,
    photos,
  } as Omit<WorkPost, "publishedAt">;
}
