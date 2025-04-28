export const DEFAULT_MARKDOWN = `# Markdown 编辑器示例

这是一个功能丰富的 Markdown 编辑器示例，展示了各种支持的特性。

## 基础文本格式

**粗体文本** 和 *斜体文本*

> 引用文本示例
> 多行引用

## 列表

### 有序列表
1. 第一项
2. 第二项
   1. 子项 1
   2. 子项 2
3. 第三项

### 无序列表
- 项目 1
- 项目 2
  - 子项目 1
  - 子项目 2
- 项目 3

## 代码示例

### 行内代码
使用 \`console.log()\` 打印信息

### 代码块
\`\`\`typescript
interface User {
  name: string;
  age: number;
  email: string;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

## 数学公式

### 行内公式
当 $a \\ne 0$ 时，方程 $ax^2 + bx + c = 0$ 的解为：

### 块级公式
$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$

## Mermaid 图表

### 流程图
\`\`\`mermaid
graph TD
    A[开始] --> B{判断}
    B -->|是| C[执行操作1]
    B -->|否| D[执行操作2]
    C --> E[结束]
    D --> E
\`\`\`

### 时序图
\`\`\`mermaid
sequenceDiagram
    participant 用户
    participant 系统
    用户->>系统: 输入内容
    系统->>系统: 处理内容
    系统-->>用户: 显示结果
\`\`\`

### 甘特图
\`\`\`mermaid
gantt
    title 项目计划
    dateFormat  YYYY-MM-DD
    section 开发
    需求分析    :a1, 2024-01-01, 7d
    设计        :a2, after a1, 5d
    开发        :a3, after a2, 14d
    section 测试
    测试        :a4, after a3, 7d
\`\`\`

### 类图
\`\`\`mermaid
classDiagram
    class Animal {
        +String name
        +int age
        +makeSound()
    }
    class Dog {
        +fetch()
    }
    class Cat {
        +climb()
    }
    Animal <|-- Dog
    Animal <|-- Cat
\`\`\`

### 状态图
\`\`\`mermaid
stateDiagram-v2
    [*] --> 空闲
    空闲 --> 处理中: 开始处理
    处理中 --> 完成: 处理完成
    完成 --> 空闲: 重置
    处理中 --> 错误: 发生错误
    错误 --> 空闲: 重试
\`\`\`

## 表格

| 功能 | 描述 | 状态 |
|------|------|------|
| Markdown 编辑 | 支持基本 Markdown 语法 | ✅ |
| 代码高亮 | 支持多种编程语言 | ✅ |
| 数学公式 | 支持 LaTeX 公式 | ✅ |
| Mermaid 图表 | 支持多种图表类型 | ✅ |
| 主题切换 | 支持深色/浅色主题 | ✅ |

## 任务列表

- [x] 支持基础 Markdown
- [x] 支持代码高亮
- [x] 支持数学公式
- [x] 支持 Mermaid 图表
- [ ] 支持导出 PDF
- [ ] 支持本地文件系统
- [ ] 支持快捷键
- [ ] 支持多语言

## 链接和图片

[GitHub 仓库](https://github.com/your-username/markdown-tauri-app)

![示例图片](https://via.placeholder.com/150)

## 脚注

这是一个脚注示例[^1]

[^1]: 这是脚注的具体内容
`; 