# Splitly

Splitly is a simple and reliable group expense splitting application that helps groups track shared expenses, calculate fair shares, and settle balances transparently. It is designed for trips, roommates, teams, and events where multiple people contribute and expenses need to be divided fairly.

---

## Problem

Managing group expenses manually often leads to confusion and conflict. Common problems include:

- One person paying more than others
- People forgetting who paid for what
- Spreadsheet calculation mistakes
- Awkward conversations when asking for money

Splitly solves these problems by automatically tracking expenses and calculating who owes whom.

---

## Solution

Splitly provides a smart system that:

- Tracks all shared expenses
- Automatically calculates fair shares
- Shows clear balances for each member
- Provides a simple settlement summary
- Keeps a transparent expense history

The goal is to make group expense management simple, transparent, and accurate.

---

## How It Works

### 1. Create a Group

Create a group for a trip, event, or shared living. Invite members using a link or email.

### 2. Add Expenses

Add expenses whenever someone pays. Select who paid and who should share the expense.

### 3. View Calculations

Splitly automatically calculates balances and shows who owes money and who should receive money.

### 4. Settle Up

Members settle payments outside the app and mark balances as settled to keep records clean.

---

## Features

### Group Management

Create and manage multiple groups. Add members and manage group expenses separately.

### Automatic Splitting

Expenses are automatically divided among selected participants. No manual calculation required.

### Settlement Summary

Clear summary that shows the minimum number of transactions required to settle balances.

### Expense History

Full history of all expenses with transparency for every group member.

### No Payment Integration

Splitly does not hold or transfer money. Users settle payments using cash or bank transfer.

### Mobile Friendly

The application works on mobile, tablet, and desktop devices.

---

## Use Cases

Splitly can be used for:

- Friends going on trips
- Roommates sharing rent and utilities
- Office teams managing shared expenses
- Family events like weddings and parties

---

## Technical Approach

Splitly is built with a focus on reliability and correct calculations.

- Balances are calculated dynamically from expense records
- Totals are not stored to prevent data inconsistency
- Server validates all transactions and amounts
- Simple architecture focused on core functionality
- Secure data handling and encryption

---

## Tech Stack

You can modify this section according to your project.

- Frontend: Next.js / React
- Backend: Node.js / FastAPI
- Database: PostgreSQL / MySQL
- ORM: Drizzle / Prisma
- Authentication: JWT

---

## Installation

```bash
git clone https://github.com/yourusername/splitly.git
cd splitly
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file and add the following variables:

```
DATABASE_URL=
JWT_SECRET=
NEXT_PUBLIC_API_URL=
```

---

## Future Improvements

- Recurring expenses
- Expense categories
- File/image receipt upload
- Smart debt minimization algorithm
- Notifications and reminders

---

## Contributing

Contributions are welcome. You can submit a pull request or open an issue for feature requests and bugs.

---

## License

This project is licensed under the MIT License.

---

## Author

Saqib

---

## Summary

Splitly is a transparent and reliable expense splitting tool designed to remove confusion from group expenses. It focuses on accuracy, simplicity, and clean financial tracking so groups can focus on their activities instead of calculations.
