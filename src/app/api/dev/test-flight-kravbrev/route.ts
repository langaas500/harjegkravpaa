import { NextResponse } from "next/server";

// DEV ONLY - Test fly-kravbrev generatoren
// Bruk: GET /api/dev/test-flight-kravbrev?type=A eller ?type=B

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "A";

  // Eksempel A: Forsinkelse (EU261)
  const testDataA = {
    problemType: "DELAY",
    passengerName: "Ola Nordmann",
    flight: {
      airline: "Norwegian Air Shuttle",
      flightNumber: "DY1234",
      departureAirport: "Oslo (OSL)",
      arrivalAirport: "London Gatwick (LGW)",
      flightDate: "2025-01-10",
      bookedPrice: "2500",
    },
    delayDuration: "over4",
    wasExtraordinary: true,
    extraordinaryReason: "Tekniske problemer med flyet",
    contactedAirline: true,
    airlineResponse: "Vi kan dessverre ikke gi kompensasjon på grunn av tekniske årsaker.",
    userDescription: "Flyet skulle gå kl 14:00 men ble forsinket flere ganger. Vi fikk nesten ingen informasjon på flyplassen!! Til slutt tok vi av kl 20:30 og kom frem til London først kl 22:00 lokal tid - over 6 timer forsinket. Veldig frustrerende da jeg hadde hotell booket og måtte betale for en natt jeg ikke brukte.",
    contactInfo: {
      address: "Storgata 1",
      postcode: "0123",
      city: "Oslo",
      phone: "912 34 567",
      email: "ola.nordmann@example.no",
    },
    bookingReference: "ABC123",
  };

  // Eksempel B: Bagasje (Montreal)
  const testDataB = {
    problemType: "BAGGAGE",
    baggageType: "delayed",
    passengerName: "Kari Hansen",
    flight: {
      airline: "SAS Scandinavian Airlines",
      flightNumber: "SK847",
      departureAirport: "København (CPH)",
      arrivalAirport: "Bergen (BGO)",
      flightDate: "2025-01-08",
    },
    baggageDelayDuration: "2to4days",
    hasPIR: true,
    hadWorkMeetings: true,
    workMeetingsDetails: "Hadde viktig kundemøte dagen etter ankomst og måtte kjøpe ny dress.",
    expenseTypes: ["clothes", "toiletries", "work_equipment"],
    totalExpenseAmount: "4850",
    hasReceipts: "yes",
    contactedAirline: true,
    airlineResponse: "Vi beklager forsinkelsen. Vennligst send kvitteringer.",
    userDescription: "Bagasjen min kom ikke med flyet fra København. Jeg ventet i 3 dager før den endelig dukket opp. I mellomtiden måtte jeg kjøpe klær, toalettsaker og ny dress til et viktig møte. Har alle kvitteringer.",
    contactInfo: {
      address: "Fjellveien 42",
      postcode: "5020",
      city: "Bergen",
      phone: "987 65 432",
      email: "kari.hansen@example.no",
    },
  };

  // Eksempel C: Manglende kritiske felt
  const testDataC = {
    problemType: "CANCELLED",
    passengerName: "",
    flight: {
      airline: "Widerøe",
      flightNumber: "", // MANGLER
      departureAirport: "Tromsø",
      arrivalAirport: "", // MANGLER
      flightDate: "2025-01-12",
    },
    cancellationNotice: "under7",
    contactInfo: {},
  };

  const testData = type === "B" ? testDataB : type === "C" ? testDataC : testDataA;

  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/generate-flight-kravbrev`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (result.error) {
      return NextResponse.json({
        ok: false,
        type: type === "B" ? "BAGASJE (Montreal)" : type === "C" ? "MANGLENDE FELT" : "FORSINKELSE (EU261)",
        error: result.error,
      });
    }

    // Vis kravbrevet i terminalen for dev
    console.log("\n" + "=".repeat(80));
    console.log(`FLY-KRAVBREV TEST - TYPE ${type}`);
    console.log("=".repeat(80));
    console.log(result.kravbrev);
    console.log("=".repeat(80));
    console.log(`Antall tegn: ${result.kravbrev.length}`);
    console.log(`Estimert sider: ${Math.ceil(result.kravbrev.length / 2500)}`);
    console.log("=".repeat(80) + "\n");

    return NextResponse.json({
      ok: true,
      type: type === "B" ? "BAGASJE (Montreal)" : type === "C" ? "MANGLENDE FELT" : "FORSINKELSE (EU261)",
      charCount: result.kravbrev.length,
      estimatedPages: Math.ceil(result.kravbrev.length / 2500),
      kravbrev: result.kravbrev,
    });
  } catch (error) {
    console.error("Test error:", error);
    return NextResponse.json({
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
