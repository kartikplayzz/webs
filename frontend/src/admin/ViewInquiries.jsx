import { Mail, Phone } from "lucide-react";

export default function ViewInquiries({ inquiries }) {
  return (
    <section className="panel overflow-hidden">
      <div className="p-5 md:p-6">
        <h2 className="text-2xl font-bold text-stone-900">View Inquiries</h2>
        <p className="mt-2 text-sm text-stone-600">Contact form submissions stored in Firebase Firestore.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="admin-table w-full min-w-[820px]">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length ? (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="font-semibold text-stone-900">{inquiry.name}</td>
                  <td>
                    <div className="grid gap-1">
                      <span className="inline-flex items-center gap-2">
                        <Phone size={14} aria-hidden="true" />
                        {inquiry.phone}
                      </span>
                      {inquiry.email ? (
                        <span className="inline-flex items-center gap-2">
                          <Mail size={14} aria-hidden="true" />
                          {inquiry.email}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td>{inquiry.service}</td>
                  <td>{inquiry.message}</td>
                  <td>{inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString() : "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No inquiries yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
