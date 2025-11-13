# 部署到 Vercel 指南

## 方法一：通过 Vercel CLI（推荐）

### 1. 安装 Vercel CLI

```bash
npm install -g vercel
```

### 2. 登录 Vercel

```bash
vercel login
```

按照提示登录您的 Vercel 账号（可以使用 GitHub、GitLab 或 Email）。

### 3. 部署项目

在项目根目录执行：

```bash
vercel
```

首次部署时，会询问几个问题：
- Set up and deploy? → `Y`
- Which scope? → 选择您的账号
- Link to existing project? → `N`
- What's your project's name? → `quzo-village-management`（或自定义）
- In which directory is your code located? → `./`（直接回车）
- Want to override the settings? → `N`（直接回车）

部署完成后，会显示部署的 URL，可以直接访问。

### 4. 生产环境部署

当您准备好正式部署时：

```bash
vercel --prod
```

这会部署到生产环境，并提供一个固定的域名。

---

## 方法二：通过 GitHub + Vercel（推荐用于团队协作）

### 1. 创建 GitHub 仓库

首先在 GitHub 创建一个新仓库（不要初始化 README）。

### 2. 推送代码到 GitHub

```bash
# 添加远程仓库（替换为您的仓库地址）
git remote add origin https://github.com/YOUR_USERNAME/quzo-village-management.git

# 推送代码
git branch -M main
git push -u origin main
```

### 3. 在 Vercel 导入项目

1. 访问 [https://vercel.com](https://vercel.com)
2. 登录并点击 "Add New..." → "Project"
3. 选择 "Import Git Repository"
4. 授权并选择您的 GitHub 仓库
5. 配置项目：
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. 点击 "Deploy"

### 4. 自动部署

完成后，每次推送到 GitHub 的 `main` 分支都会自动触发部署。

---

## 方法三：通过 Vercel 网页界面直接导入

### 1. 访问 Vercel

登录 [https://vercel.com](https://vercel.com)

### 2. 导入项目

1. 点击 "Add New..." → "Project"
2. 选择 "Import Git Repository"
3. 如果项目在 GitHub，授权后选择仓库
4. 或者点击 "Import Third-Party Git Repository" 输入仓库 URL

### 3. 配置部署设置

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. 环境变量（如果需要）

点击 "Environment Variables" 添加环境变量（本项目暂不需要）。

### 5. 部署

点击 "Deploy" 开始部署。

---

## 验证部署

部署完成后，您会得到：

1. **Production URL**: 如 `https://quzo-village-management.vercel.app`
2. **Preview URLs**: 每次提交都会生成预览 URL

访问 URL 确认：
- ✅ 页面正常加载
- ✅ 地图显示（确保有网络连接到天地图 API）
- ✅ 数据正确显示（176户、805人、235宅基地）
- ✅ 菜单功能正常
- ✅ 数字助手语音功能正常

---

## 自定义域名（可选）

### 在 Vercel 添加域名

1. 进入项目的 "Settings" → "Domains"
2. 输入您的域名
3. 按照提示配置 DNS 记录

---

## 常见问题

### Q: 部署失败怎么办？

A: 检查构建日志，常见问题：
- Node 版本不兼容 → 在 `package.json` 添加 `"engines": { "node": ">=18.0.0" }`
- 依赖安装失败 → 检查 `package.json` 依赖是否正确
- 构建超时 → 优化构建配置或升级 Vercel 计划

### Q: 地图不显示怎么办？

A:
- 确保有网络连接
- 检查浏览器控制台是否有跨域或 API 错误
- 天地图 API 密钥是否有效

### Q: 如何更新部署？

A:
- **CLI 方式**: 执行 `vercel --prod`
- **GitHub 方式**: 推送代码到 main 分支，自动部署

### Q: 如何回滚到之前的版本？

A:
1. 进入 Vercel 项目
2. 点击 "Deployments"
3. 找到之前的部署，点击 "Promote to Production"

---

## 性能优化建议

部署后可以考虑以下优化：

1. **启用 Vercel Analytics**
   - 进入项目 Settings → Analytics
   - 启用以监控访问数据

2. **配置缓存**
   - Vercel 自动处理静态资源缓存
   - 可在 `vercel.json` 中自定义

3. **CDN 加速**
   - Vercel 自动使用全球 CDN
   - 中国大陆访问可能较慢，建议使用备用方案

4. **代码分割**
   - 考虑按路由分割代码
   - 使用动态 import 减小初始包大小

---

## 技术支持

- Vercel 文档: https://vercel.com/docs
- Vite 文档: https://vitejs.dev
- 项目问题: 提交 GitHub Issue

---

**部署完成后，请访问您的 Vercel URL 并测试所有功能！** 🎉
